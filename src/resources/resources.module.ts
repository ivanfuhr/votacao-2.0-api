import { Module } from '@nestjs/common';
import { ResolutionsModule } from './resolutions/resolutions.module';

@Module({
  imports: [ResolutionsModule],
})
export class ResourcesModule {}
