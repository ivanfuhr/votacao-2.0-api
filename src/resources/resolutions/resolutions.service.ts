import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationOptionsDto } from 'src/common/dtos/request/pagination.options.dto';
import { paginate } from 'src/common/helpers/paginate.helper';
import { Repository } from 'typeorm';
import { CreateResolutionDto } from './dto/request/create-resolution.dto';
import { UpdateResolutionDto } from './dto/request/update-resolution.dto';
import { ResolutionDto } from './dto/response/resolution.dto';
import { Resolution } from './entities/resolution.entity';
import { ResolutionMapper } from './mappers/resolution.mapper';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(Resolution)
    private resolutionRepository: Repository<Resolution>,
  ) {}

  async create(createResolutionDto: CreateResolutionDto) {
    const resolutionData =
      this.resolutionRepository.create(createResolutionDto);

    const resolution = await this.resolutionRepository.save(resolutionData);

    return ResolutionMapper.resolutionEntityToDto(resolution);
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
    const resolution = await this.findResolutionById(id);
    return ResolutionMapper.resolutionEntityToDto(resolution);
  }

  async update(id: string, updateResolutionDto: UpdateResolutionDto) {
    const resolution = await this.findResolutionById(id);

    const resolutionData = this.resolutionRepository.merge(
      resolution,
      updateResolutionDto,
    );

    const updatedResolution =
      await this.resolutionRepository.save(resolutionData);

    return ResolutionMapper.resolutionEntityToDto(updatedResolution);
  }

  async remove(id: string) {
    const resolution = await this.findResolutionById(id);

    return await this.resolutionRepository.remove(resolution);
  }

  private async findResolutionById(id: string) {
    const resolution = await this.resolutionRepository.findOne({
      where: { id },
    });

    if (!resolution) {
      throw new NotFoundException('Resolution not found');
    }

    return resolution;
  }
}
