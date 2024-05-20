import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ResolutionsModule } from './resolutions/resolutions.module';
import { SessionsModule } from './sessions/sessions.module';
import { UsersModule } from './users/users.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CategoriesModule,
    ResolutionsModule,
    SessionsModule,
    VotesModule,
  ],
})
export class ResourcesModule {}
