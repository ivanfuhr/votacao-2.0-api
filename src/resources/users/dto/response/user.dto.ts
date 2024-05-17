import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Role } from '../../enums/role.enum';

export class UserDto {
  @Expose()
  @ApiProperty({
    example: '84201ee9-95fc-483d-8a22-38c22769da6c',
    description: 'The id of the user',
    type: String,
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    type: String,
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'The document of the user',
    type: String,
    example: '000.000.000-00',
    pattern: '^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$',
  })
  document: string;

  @Expose()
  @ApiProperty({
    description: 'The role of the user',
    type: String,
    example: Role.USER,
  })
  role: Role;

  @Expose()
  @ApiProperty({
    example: '2021-09-17T18:15:19.000Z',
    description: 'The date when the user was created',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2021-09-17T18:15:19.000Z',
    description: 'The date when the user was updated',
  })
  updatedAt: Date;
}
