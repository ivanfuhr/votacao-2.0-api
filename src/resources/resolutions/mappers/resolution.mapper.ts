import { plainToClass } from 'class-transformer';
import { ResolutionDto } from '../dto/response/resolution.dto';
import { Resolution } from '../entities/resolution.entity';

export abstract class ResolutionMapper {
  static resolutionEntityToDto(resolution: Resolution): ResolutionDto {
    return plainToClass(ResolutionDto, resolution, {
      excludeExtraneousValues: true,
    });
  }
}
