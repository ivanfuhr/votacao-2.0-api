import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashHelper } from 'src/common/helpers/hash.helper';
import { UserDto } from '../users/dto/response/user.dto';
import { UserMapper } from '../users/mappers/user.mapper';
import { USERS_SERVICE_TOKEN } from '../users/users.constants';
import { UsersService } from '../users/users.service';
import { UserAccessDto } from './dto/response/user-access.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE_TOKEN)
    private readonly usersService: UsersService,

    private jwtService: JwtService,
  ) {}

  async validadeUser(
    document: string,
    password: string,
  ): Promise<UserDto | null> {
    const user = await this.usersService.findByDocument(document);

    if (!user) {
      return null;
    }

    const isValid = await HashHelper.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return UserMapper.userEntityToDto(user);
  }

  async login(user: UserDto): Promise<UserAccessDto> {
    const payload = { username: user.name, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
