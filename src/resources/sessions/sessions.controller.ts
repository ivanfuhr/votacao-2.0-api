import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../users/enums/role.enum';
import { CreateSessionDto } from './dto/request/create-session.dto';
import { UpdateSessionDto } from './dto/request/update-session.dto';
import { SessionDto } from './dto/response/session.dto';
import { SESSIONS_SERVICE_TOKEN } from './sessions.constants';
import { SessionsService } from './sessions.service';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
  constructor(
    @Inject(SESSIONS_SERVICE_TOKEN)
    private readonly sessionsService: SessionsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a session',
    description: 'This will create a new session',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: SessionDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all sessions',
    description: 'This will return all active sessions',
  })
  @ApiOkResponse({
    description: 'All active sessions',
    type: [SessionDto],
  })
  findAllActive() {
    return this.sessionsService.findAllActive();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a session by id',
    description: 'This will return a session by id',
  })
  @ApiOkResponse({
    description: 'The session',
    type: SessionDto,
  })
  @ApiNotFoundResponse({
    description: 'Session not found',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the session',
    schema: {
      type: 'string',
      format: 'uuid',
    },
  })
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a session',
    description: 'This will update a session by id',
  })
  @ApiOkResponse({
    description: 'The session has been successfully updated.',
    type: SessionDto,
  })
  @ApiNotFoundResponse({
    description: 'Session not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the session',
    schema: {
      type: 'string',
      format: 'uuid',
    },
  })
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a session',
    description: 'This will delete a session by id',
  })
  @ApiNoContentResponse({
    description: 'The session has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Session not found',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the session',
    schema: {
      type: 'string',
      format: 'uuid',
    },
  })
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}
