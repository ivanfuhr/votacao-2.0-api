import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashHelper } from 'src/common/helpers/hash.helper';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserDto } from './dto/response/user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { UsersService } from './users.service';

@Injectable()
export class UsersServiceImpl implements UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const checkDocument = await this.userRepository.findOne({
      where: {
        document: createUserDto.document,
      },
    });

    if (checkDocument) {
      throw new BadRequestException('Document already in use');
    }

    const user = this.userRepository.create(createUserDto);

    user.password = await HashHelper.hash(createUserDto.password);

    await this.userRepository.save(user);

    return UserMapper.userEntityToDto(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();

    return users.map((user) => UserMapper.userEntityToDto(user));
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.findUserByIdOrFail(id);

    return UserMapper.userEntityToDto(user);
  }

  async findByDocument(document: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        document,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.findUserByIdOrFail(id);

    if (
      updateUserDto.newPassword &&
      updateUserDto.newPassword !== updateUserDto.confirmPassword
    ) {
      throw new BadRequestException('Passwords do not match');
    }

    const updatedUser = this.userRepository.merge(user, updateUserDto);

    if (updateUserDto.newPassword) {
      updatedUser.password = await HashHelper.hash(updateUserDto.newPassword);
    }

    await this.userRepository.save(updatedUser);

    return UserMapper.userEntityToDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findUserByIdOrFail(id);

    await this.userRepository.remove(user);
  }

  private async findUserByIdOrFail(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user;
  }
}
