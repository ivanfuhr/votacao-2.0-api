import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SESSIONS_SERVICE_TOKEN } from '../sessions/sessions.constants';
import { oneSession } from '../sessions/sessions.service.impl.spec';
import { UserDto } from '../users/dto/response/user.dto';
import { VoteDto } from './dto/response/vote.dto';
import { Vote } from './entities/vote.entity';
import { VoteType } from './enums/vote-type.enum';
import { VotesService } from './votes.service';
import { VotesServiceImpl } from './votes.service.impl';

const oneVote = {
  vote: VoteType.YES,
  sessionId: oneSession.id,
};

const oneUser = {
  id: '48f36572-589f-433b-a940-63de6701f56e',
} as UserDto;

describe('VotesServiceImpl', () => {
  let service: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesServiceImpl,
        {
          provide: getRepositoryToken(Vote),
          useValue: {
            create: jest.fn((data) => data),
            save: jest.fn((data) => data),
          },
        },
        {
          provide: SESSIONS_SERVICE_TOKEN,
          useValue: {
            findOne: jest.fn((data) => {
              if (data === oneVote.sessionId) {
                return oneSession;
              }

              return new Error('Session not found');
            }),
          },
        },
      ],
    }).compile();

    service = module.get<VotesService>(VotesServiceImpl);
  });

  describe('create', () => {
    it('should return a new vote given valid data', async () => {
      oneSession.startAt = new Date();

      const result = await service.create(oneVote, oneUser);

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(VoteDto);
    });

    it('should throw an error if session has not started yet', async () => {
      oneSession.startAt = new Date(Date.now() + 1000000);

      await expect(service.create(oneVote, oneUser)).rejects.toThrow(
        'Session has not started yet',
      );
    });

    it('should throw an error if session has ended', async () => {
      oneSession.startAt = new Date(Date.now() - 1000000);
      oneSession.endAt = new Date(Date.now() - 1000);

      await expect(service.create(oneVote, oneUser)).rejects.toThrow(
        'Session has ended',
      );
    });
  });
});
