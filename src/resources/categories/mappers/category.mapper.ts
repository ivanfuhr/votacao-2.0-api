import { plainToClass } from 'class-transformer';
import { CategoryDto } from '../dto/response/category.dto';
import { Category } from '../entities/category.entity';

export abstract class CategoryMapper {
  static categoryEntityToDto(category: Category): CategoryDto {
    return plainToClass(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }
}
