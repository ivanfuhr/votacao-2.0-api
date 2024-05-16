import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateVoteDto } from './dto/request/create-vote.dto';
import { VoteDto } from './dto/response/vote.dto';
import { VOTES_SERVICE_TOKEN } from './votes.constants';
import { VotesService } from './votes.service';

@ApiTags('Votes')
@Controller('votes')
export class VotesController {
  constructor(
    @Inject(VOTES_SERVICE_TOKEN)
    private readonly votesService: VotesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a vote',
    description: 'This will create a new vote',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: VoteDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }
}
