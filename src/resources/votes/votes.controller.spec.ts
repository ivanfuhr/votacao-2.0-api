import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from '../users/dto/response/user.dto';
import { VoteType } from './enums/vote-type.enum';
import { VOTES_SERVICE_TOKEN } from './votes.constants';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';

const oneVote = {
  vote: VoteType.YES,
  sessionId: '9a91edd8-c5de-4b29-be85-0cefd962bfb6',
};

const oneUser = {
  id: '48f36572-589f-433b-a940-63de6701f56e',
} as UserDto;

describe('VotesController', () => {
  let controller: VotesController;
  let service: VotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotesController],
      providers: [
        {
          provide: VOTES_SERVICE_TOKEN,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VotesController>(VotesController);
    service = module.get<VotesService>(VOTES_SERVICE_TOKEN);
  });

  describe('create', () => {
    it('should return a new vote given valid data', async () => {
      await controller.create(oneVote, oneUser);

      expect(service.create).toHaveBeenCalledWith(oneVote, oneUser);
    });
  });
});
