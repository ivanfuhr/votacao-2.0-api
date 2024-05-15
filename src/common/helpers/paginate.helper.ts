import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationOptionsDto } from '../dtos/request/pagination.options.dto';
import { PaginationDto } from '../dtos/response/pagination.dto';

export async function paginate<
  TEntity extends ObjectLiteral,
  TMapper = TEntity,
>(
  queryBuilder: SelectQueryBuilder<TEntity>,
  options: PaginationOptionsDto,
  mapper?: (item: TEntity) => TMapper,
): Promise<PaginationDto<TMapper>> {
  const total = await queryBuilder.getCount();
  const currentPage = options.page || 1;
  const offset = (currentPage - 1) * options.limit;

  queryBuilder.limit(options.limit).offset(offset);
  const items = await queryBuilder.getMany();

  const data = mapper ? items.map(mapper) : (items as unknown as TMapper[]);

  return new PaginationDto<TMapper>({
    data,
    meta: {
      page: currentPage,
      perPage: options.limit,
      total,
    },
  });
}
