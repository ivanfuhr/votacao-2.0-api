import { Module } from '@nestjs/common';
import { ResolutionsModule } from './resolutions/resolutions.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ResolutionsModule, CategoriesModule],
})
export class ResourcesModule {}
