import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryMapper } from './mappers/category.mapper';

@Injectable()
export class CategoriesServiceImpl implements CategoriesService {
  constructor(
    @InjectRepository(Category)
    private resolutionRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const categoryData = this.resolutionRepository.create(createCategoryDto);

    const category = await this.resolutionRepository.save(categoryData);

    return CategoryMapper.categoryEntityToDto(category);
  }

  async findAll() {
    const resolutions = await this.resolutionRepository.find();

    return resolutions.map((resolution) =>
      CategoryMapper.categoryEntityToDto(resolution),
    );
  }

  async findOne(id: string) {
    const resolution = await this.findCategoryByIdOrFail(id);

    return CategoryMapper.categoryEntityToDto(resolution);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findCategoryByIdOrFail(id);

    const categoryData = this.resolutionRepository.merge(
      category,
      updateCategoryDto,
    );

    const updatedCategory = await this.resolutionRepository.save(categoryData);

    return CategoryMapper.categoryEntityToDto(updatedCategory);
  }

  async remove(id: string) {
    const category = await this.findCategoryByIdOrFail(id);
    await this.resolutionRepository.remove(category);
  }

  private async findCategoryByIdOrFail(id: string) {
    const category = await this.resolutionRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
