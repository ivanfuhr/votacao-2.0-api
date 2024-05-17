import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserDto } from './dto/response/user.dto';

export interface UsersService {
  create(createUserDto: CreateUserDto): Promise<UserDto>;

  findAll(): Promise<UserDto[]>;

  findOne(id: string): Promise<UserDto>;

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto>;

  remove(id: string): Promise<void>;
}
