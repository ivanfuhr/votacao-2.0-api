import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MaxLength(255, { message: 'Title must have a maximum of 255 characters' })
  @ApiProperty({
    description: 'Title of the category',
    type: String,
    required: true,
    example: 'Causas Ambientais',
  })
  title: string;
}
