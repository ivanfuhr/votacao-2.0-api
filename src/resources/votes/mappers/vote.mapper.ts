import { plainToClass } from 'class-transformer';
import { VoteDto } from '../dto/response/vote.dto';
import { Vote } from '../entities/vote.entity';

export abstract class VoteMapper {
  static voteEntityToDto(vote: Vote): VoteDto {
    return plainToClass(VoteDto, vote, {
      excludeExtraneousValues: true,
    });
  }
}
