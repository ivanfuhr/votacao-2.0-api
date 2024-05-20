import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthUserDto {
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
}
