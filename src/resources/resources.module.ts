import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ResolutionsModule } from './resolutions/resolutions.module';
import { SessionsModule } from './sessions/sessions.module';
import { VotesModule } from './votes/votes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ResolutionsModule, CategoriesModule, SessionsModule, VotesModule, UsersModule],
})
export class ResourcesModule {}
