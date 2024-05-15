import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class PaginationMetaDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'The current page of the query',
  })
  page: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'The amount of items per page',
  })
  perPage: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'The total amount of items',
  })
  total: number;
}

export class PaginationDto<TData> {
  @Expose()
  @ApiProperty({
    type: [Object],
    description: 'The data returned by the query',
  })
  data: TData[];

  @Expose()
  @ApiProperty({
    type: PaginationMetaDto,
    description: 'The metadata of the query',
  })
  meta: PaginationMetaDto;

  constructor(partial: Partial<PaginationDto<TData>>) {
    Object.assign(this, partial);
  }
}
