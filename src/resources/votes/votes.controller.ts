import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '../users/dto/response/user.dto';
import { CreateVoteDto } from './dto/request/create-vote.dto';
import { VoteDto } from './dto/response/vote.dto';
import { VOTES_SERVICE_TOKEN } from './votes.constants';
import { VotesService } from './votes.service';

@ApiTags('Votes')
@Controller('votes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
  create(@Body() createVoteDto: CreateVoteDto, @User() user: UserDto) {
    return this.votesService.create(createVoteDto, user);
  }
}
