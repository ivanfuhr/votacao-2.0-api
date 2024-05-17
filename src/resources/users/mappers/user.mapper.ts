import { plainToClass } from 'class-transformer';
import { UserDto } from '../dto/response/user.dto';
import { User } from '../entities/user.entity';

export abstract class UserMapper {
  static userEntityToDto(user: User): UserDto {
    return plainToClass(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
