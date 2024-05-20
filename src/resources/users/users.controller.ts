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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserDto } from './dto/response/user.dto';
import { Role } from './enums/role.enum';
import { USERS_SERVICE_TOKEN } from './users.constants';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE_TOKEN)
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a user',
    description: 'Create a new user',
  })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiOkResponse({
    description: 'Return all users.',
    type: [UserDto],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user',
    description: 'Get a user by id',
  })
  @ApiOkResponse({
    description: 'Return a user.',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user',
    description: 'Update a user by id',
  })
  @ApiOkResponse({
    description: 'Return a user updated.',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Delete a user by id',
  })
  @ApiOkResponse({
    description: 'User deleted.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
