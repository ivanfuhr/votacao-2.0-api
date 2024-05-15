import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CategoryDto } from 'src/resources/categories/dto/response/category.dto';

export class ResolutionDto {
  @Expose()
  @ApiProperty({
    example: 'a86e75d7-2ed1-4cf5-ae08-54b4e61bc294',
    description: 'The id of the resolution',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: 'Redução de Emissões de Carbono',
    description: 'The title of the resolution',
  })
  title: string;

  @Expose()
  @ApiProperty({
    example:
      'Esta resolução propõe a implementação de um plano para reduzir as emissões de carbono da empresa em 50% nos próximos 10 anos, adotando energias renováveis e melhorando a eficiência energética nos processos produtivos.',
    description: 'The description of the resolution',
  })
  description: string;

  @Expose()
  @ApiProperty({
    example: {
      id: '65549818-cada-4e90-a915-2647ea56b413',
      title: 'Causas Ambientais',
      createdAt: '2021-09-17T18:15:19.000Z',
      updatedAt: '2021-09-17T18:15:19.000Z',
    },
    description: 'The category of the resolution',
  })
  category: CategoryDto;

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
