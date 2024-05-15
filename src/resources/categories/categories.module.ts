import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CATEGORIES_SERVICE_TOKEN } from './categories.constants';
import { CategoriesController } from './categories.controller';
import { CategoriesServiceImpl } from './categories.service.impl';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: CATEGORIES_SERVICE_TOKEN,
      useClass: CategoriesServiceImpl,
    },
  ],
  exports: [CATEGORIES_SERVICE_TOKEN],
})
export class CategoriesModule {}
