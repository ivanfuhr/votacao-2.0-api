import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryDto {
  @Expose()
  @ApiProperty({
    example: '65549818-cada-4e90-a915-2647ea56b413',
    description: 'The id of the category',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: 'Causas Ambientais',
    description: 'The title of the category',
  })
  title: string;

  @Expose()
  @ApiProperty({
    example: '2021-09-17T18:15:19.000Z',
    description: 'The date when the resolution was created',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2021-09-17T18:15:19.000Z',
    description: 'The date when the resolution was last updated',
  })
  updatedAt: Date;
}
