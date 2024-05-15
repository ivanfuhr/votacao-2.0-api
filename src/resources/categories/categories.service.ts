import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryMapper } from './mappers/category.mapper';

@Injectable()
export class CategoriesService {
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
    const resolution = await this.findCategoryById(id);

    return CategoryMapper.categoryEntityToDto(resolution);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findCategoryById(id);

    const categoryData = this.resolutionRepository.merge(
      category,
      updateCategoryDto,
    );

    const updatedCategory = await this.resolutionRepository.save(categoryData);

    return CategoryMapper.categoryEntityToDto(updatedCategory);
  }

  async remove(id: string) {
    const category = await this.findCategoryById(id);

    return await this.resolutionRepository.remove(category);
  }

  private async findCategoryById(id: string) {
    const category = await this.resolutionRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
