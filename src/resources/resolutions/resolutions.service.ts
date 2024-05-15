import { PaginationOptionsDto } from 'src/common/dtos/request/pagination.options.dto';
import { PaginationDto } from 'src/common/dtos/response/pagination.dto';
import { UpdateCategoryDto } from '../categories/dto/request/update-category.dto';
import { CreateResolutionDto } from './dto/request/create-resolution.dto';
import { ResolutionDto } from './dto/response/resolution.dto';

export interface ResolutionsService {
  create(createResolutionDto: CreateResolutionDto): Promise<ResolutionDto>;

  findAll(options: PaginationOptionsDto): Promise<PaginationDto<ResolutionDto>>;

  findOne(id: string): Promise<ResolutionDto>;

  update(
    id: string,
    updateResolutionDto: UpdateCategoryDto,
  ): Promise<ResolutionDto>;

  remove(id: string): Promise<void>;
}
