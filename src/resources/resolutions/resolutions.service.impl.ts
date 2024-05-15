import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationOptionsDto } from 'src/common/dtos/request/pagination.options.dto';
import { paginate } from 'src/common/helpers/paginate.helper';
import { Repository } from 'typeorm';
import { CATEGORIES_SERVICE_TOKEN } from '../categories/categories.constants';
import { CategoriesService } from '../categories/categories.service';
import { CreateResolutionDto } from './dto/request/create-resolution.dto';
import { UpdateResolutionDto } from './dto/request/update-resolution.dto';
import { ResolutionDto } from './dto/response/resolution.dto';
import { Resolution } from './entities/resolution.entity';
import { ResolutionMapper } from './mappers/resolution.mapper';
import { ResolutionsService } from './resolutions.service';

@Injectable()
export class ResolutionsServiceImpl implements ResolutionsService {
  constructor(
    @InjectRepository(Resolution)
    private resolutionRepository: Repository<Resolution>,

    @Inject(CATEGORIES_SERVICE_TOKEN)
    private categoryService: CategoriesService,
  ) {}

  async create(createResolutionDto: CreateResolutionDto) {
    const category = await this.categoryService.findOne(
      createResolutionDto.categoryId,
    );

    const resolutionData = this.resolutionRepository.create({
      ...createResolutionDto,
      category,
    });

    const resolution = await this.resolutionRepository.save(resolutionData);

    return ResolutionMapper.resolutionEntityToDto({ ...resolution, category });
  }

  async findAll(options: PaginationOptionsDto) {
    const queryBuilder =
      this.resolutionRepository.createQueryBuilder('resolution');

    queryBuilder.orderBy('resolution.createdAt', 'DESC');

    return await paginate<Resolution, ResolutionDto>(
      queryBuilder,
      options,
      ResolutionMapper.resolutionEntityToDto,
    );
  }

  async findOne(id: string) {
    const resolution = await this.findResolutionByIdOrFail(id);
    return ResolutionMapper.resolutionEntityToDto(resolution);
  }

  async update(id: string, updateResolutionDto: UpdateResolutionDto) {
    const resolution = await this.findResolutionByIdOrFail(id);

    const category = await this.categoryService.findOne(
      updateResolutionDto.categoryId,
    );

    const resolutionData = this.resolutionRepository.merge(resolution, {
      ...resolution,
      ...updateResolutionDto,
      category,
    });

    const updatedResolution =
      await this.resolutionRepository.save(resolutionData);

    return ResolutionMapper.resolutionEntityToDto({
      ...updatedResolution,
      category,
    });
  }

  async remove(id: string) {
    const resolution = await this.findResolutionByIdOrFail(id);

    try {
      this.resolutionRepository.remove(resolution);
    } catch (error) {
      throw new Error('Error while removing resolution');
    }
  }

  private async findResolutionByIdOrFail(id: string) {
    const resolution = await this.resolutionRepository.findOne({
      where: { id },
    });

    if (!resolution) {
      throw new NotFoundException('Resolution not found');
    }

    return resolution;
  }
}
