import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateResolutionDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  @MaxLength(255, { message: 'Title must have a maximum of 255 characters' })
  @ApiProperty({
    description: 'Title of the resolution',
    type: String,
    required: true,
    example: 'Redução de Emissões de Carbono',
  })
  title: string;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({ message: 'Description must be a string' })
  @ApiProperty({
    description: 'Description of the resolution',
    type: String,
    required: true,
    example:
      'Esta resolução propõe a implementação de um plano para reduzir as emissões de carbono da empresa em 50% nos próximos 10 anos, adotando energias renováveis e melhorando a eficiência energética nos processos produtivos.',
  })
  description: string;

  @IsNotEmpty({ message: 'Category ID is required' })
  @IsString({ message: 'Category ID must be a string' })
  @IsUUID(4, { message: 'Category ID must be a valid UUID' })
  @ApiProperty({
    description: 'Category ID of the resolution',
    type: String,
    required: true,
    example: '5561cda1-f738-46b7-8a8c-e0c9c802525f',
  })
  categoryId: string;
}
