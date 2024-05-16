import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ResolutionsModule } from './resolutions/resolutions.module';
import { SessionsModule } from './sessions/sessions.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [ResolutionsModule, CategoriesModule, SessionsModule, VotesModule],
})
export class ResourcesModule {}
