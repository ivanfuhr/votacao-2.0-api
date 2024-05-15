import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ResolutionDto } from 'src/resources/resolutions/dto/response/resolution.dto';

export class SessionDto {
  @Expose()
  @ApiProperty({
    example: 'a86e75d7-2ed1-4cf5-ae08-54b4e61bc294',
    description: 'The id of the session',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: {
      id: 'a86e75d7-2ed1-4cf5-ae08-54b4e61bc294',
      title: 'Redução de Emissões de Carbono',
      description:
        'Esta resolução propõe a implementação de um plano para reduzir as emissões de carbono da empresa em 50% nos próximos 10 anos, adotando energias renováveis e melhorando a eficiência energética nos processos produtivos.',
      category: {
        id: '65549818-cada-4e90-a915-2647ea56b413',
        title: 'Causas Ambientais',
        createdAt: '2021-09-17T18:15:19.000Z',
        updatedAt: '2021-09-17T18:15:19.000Z',
      },
      createdAt: '2021-09-17T18:15:19.000Z',
      updatedAt: '2021-09-17T18:15:19.000Z',
    },
    description: 'The resolution of the session',
  })
  resolution: ResolutionDto;

  @Expose()
  @ApiProperty({
    example: '2021-09-17T18:15:19.000Z',
    description: 'The date when the session started',
  })
  startAt: Date;

  @Expose()
  @ApiProperty({
    example: '2021-09-17T18:15:19.000Z',
    description: 'The date when the session ended',
  })
  endAt: Date;

  @Expose()
  @ApiProperty({
    example: '2021-09-17T18:15:19.000Z',
    description: 'The date when the session was created',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2021-09-17T18:15:19.000Z',
    description: 'The date when the session was last updated',
  })
  updatedAt: Date;
}
