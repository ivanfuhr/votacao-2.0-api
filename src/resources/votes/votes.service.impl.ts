import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SESSIONS_SERVICE_TOKEN } from '../sessions/sessions.constants';
import { SessionsService } from '../sessions/sessions.service';
import { UserDto } from '../users/dto/response/user.dto';
import { CreateVoteDto } from './dto/request/create-vote.dto';
import { VoteDto } from './dto/response/vote.dto';
import { Vote } from './entities/vote.entity';
import { VoteMapper } from './mappers/vote.mapper';
import { VotesService } from './votes.service';

@Injectable()
export class VotesServiceImpl implements VotesService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<Vote>,

    @Inject(SESSIONS_SERVICE_TOKEN)
    private readonly sessionsService: SessionsService,
  ) {}

  async create(createVoteDto: CreateVoteDto, user: UserDto): Promise<VoteDto> {
    const session = await this.sessionsService.findOne(createVoteDto.sessionId);

    const now = new Date();

    if (now < session.startAt) {
      throw new BadRequestException('Session has not started yet');
    }

    if (now > session.endAt) {
      throw new BadRequestException('Session has ended');
    }

    const voteData = this.voteRepository.create(createVoteDto);
    voteData.userId = user.id;

    const vote = await this.voteRepository.save(voteData);

    return VoteMapper.voteEntityToDto(vote);
  }
}
