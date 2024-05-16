import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsModule } from '../sessions/sessions.module';
import { Vote } from './entities/vote.entity';
import { VOTES_SERVICE_TOKEN } from './votes.constants';
import { VotesController } from './votes.controller';
import { VotesServiceImpl } from './votes.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), SessionsModule],
  controllers: [VotesController],
  providers: [
    {
      provide: VOTES_SERVICE_TOKEN,
      useClass: VotesServiceImpl,
    },
  ],
})
export class VotesModule {}
