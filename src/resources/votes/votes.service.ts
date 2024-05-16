import { CreateVoteDto } from './dto/request/create-vote.dto';
import { VoteDto } from './dto/response/vote.dto';

export interface VotesService {
  create(createVoteDto: CreateVoteDto): Promise<VoteDto>;
}
