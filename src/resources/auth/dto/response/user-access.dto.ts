import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserAccessDto {
  @Expose()
  @ApiProperty({
    description: 'The JWT access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhOTg1ODNmMS02YmIyLTQyMmYtODdmZi1kMjkxYTYyZTYxMDgiLCJpYXQiOjE2MzEwMjEwMjEsImV4cCI6MTYzMTAyNDYyMX0.1oW2g4J1v2dF9n6Km9Z1zZzR4a9m2CQ3jJ1MzUZzR4a',
  })
  accessToken: string;
}
