import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { CategoryDto } from './dto/response/category.dto';

export interface CategoriesService {
  create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto>;

  findAll(): Promise<CategoryDto[]>;

  findOne(id: string): Promise<CategoryDto>;

  update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto>;

  remove(id: string): Promise<void>;
}
