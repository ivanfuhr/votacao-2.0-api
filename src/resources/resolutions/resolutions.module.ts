import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resolution } from './entities/resolution.entity';
import { ResolutionsController } from './resolutions.controller';
import { ResolutionsService } from './resolutions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Resolution])],
  controllers: [ResolutionsController],
  providers: [ResolutionsService],
})
export class ResolutionsModule {}
