import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(PartialType(CreateUserDto), [
  'name',
  'role',
] as const) {
  @IsOptional()
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  @IsString({ message: 'Password must be a string' })
  @ApiProperty({
    description: 'New password of the user',
    type: String,
    example: '123456',
    minLength: 6,
  })
  newPassword: string;

  @IsOptional()
  @MinLength(6, { message: 'Confirm password must have at least 6 characters' })
  @IsString({ message: 'Confirm password must be a string' })
  @ApiProperty({
    description: 'Confirm password of the user',
    type: String,
    example: '123456',
    minLength: 6,
  })
  confirmPassword: string;
}
