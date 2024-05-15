import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResolutionsModule } from '../resolutions/resolutions.module';
import { Session } from './entities/session.entity';
import { SESSIONS_SERVICE_TOKEN } from './sessions.constants';
import { SessionsController } from './sessions.controller';
import { SessionsServiceImpl } from './sessions.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), ResolutionsModule],
  controllers: [SessionsController],
  providers: [
    {
      provide: SESSIONS_SERVICE_TOKEN,
      useClass: SessionsServiceImpl,
    },
  ],
})
export class SessionsModule {}
