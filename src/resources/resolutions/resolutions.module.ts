import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from '../categories/categories.module';
import { Resolution } from './entities/resolution.entity';
import { RESOLUTIONS_SERVICE_TOKEN } from './resolutions.constants';
import { ResolutionsController } from './resolutions.controller';
import { ResolutionsServiceImpl } from './resolutions.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Resolution]), CategoriesModule],
  controllers: [ResolutionsController],
  providers: [
    {
      provide: RESOLUTIONS_SERVICE_TOKEN,
      useClass: ResolutionsServiceImpl,
    },
  ],
  exports: [RESOLUTIONS_SERVICE_TOKEN],
})
export class ResolutionsModule {}
