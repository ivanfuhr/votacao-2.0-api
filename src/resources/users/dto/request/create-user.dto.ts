import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(3, { message: 'Name must have at least 3 characters' })
  @IsString({ message: 'Name must be a string' })
  @ApiProperty({
    description: 'Name of the user',
    type: String,
    required: true,
    example: 'John Doe',
    minLength: 3,
  })
  name: string;

  @IsNotEmpty({ message: 'Document is required' })
  @IsString({ message: 'Document must be a string' })
  @ApiProperty({
    description: 'Document of the user',
    type: String,
    required: true,
    example: '000.000.000-00',
    pattern: '^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$',
  })
  document: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  @IsString({ message: 'Password must be a string' })
  @ApiProperty({
    description: 'Password of the user',
    type: String,
    required: true,
    example: '123456',
    minLength: 6,
  })
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @MinLength(6, { message: 'Confirm password must have at least 6 characters' })
  @IsString({ message: 'Confirm password must be a string' })
  @ApiProperty({
    description: 'Confirm password of the user',
    type: String,
    required: true,
    example: '123456',
    minLength: 6,
  })
  confirmPassword: string;

  @IsNotEmpty({ message: 'Role is required' })
  @ApiProperty({
    description: 'Role of the user (Only ADMINS can create ADMINS)',
    type: String,
    required: true,
    example: Role.USER,
    enum: Role,
  })
  role: Role;
}
