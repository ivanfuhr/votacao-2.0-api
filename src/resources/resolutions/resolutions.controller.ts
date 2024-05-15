import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/response/pagination.dto';
import { CreateResolutionDto } from './dto/request/create-resolution.dto';
import { UpdateResolutionDto } from './dto/request/update-resolution.dto';
import { ResolutionDto } from './dto/response/resolution.dto';
import { RESOLUTIONS_SERVICE_TOKEN } from './resolutions.constants';
import { ResolutionsService } from './resolutions.service';

@ApiTags('Resolutions')
@Controller('resolutions')
export class ResolutionsController {
  constructor(
    @Inject(RESOLUTIONS_SERVICE_TOKEN)
    private readonly resolutionsService: ResolutionsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a resolution',
    description: 'This will create a new resolution',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ResolutionDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  create(@Body() createResolutionDto: CreateResolutionDto) {
    return this.resolutionsService.create(createResolutionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all resolutions',
    description: 'This will return all resolutions with pagination',
  })
  @ApiExtraModels(PaginationDto, ResolutionDto)
  @ApiOkResponse({
    description: 'List all resolutions with pagination',
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginationDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(ResolutionDto) },
            },
          },
        },
      ],
    },
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 10,
    description: 'Number of items per page',
  })
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number = 0,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit: number = 10,
  ) {
    return this.resolutionsService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a resolution',
    description: 'This will return a resolution by its ID',
  })
  @ApiOkResponse({
    description: 'The record has been successfully retrieved.',
    type: ResolutionDto,
  })
  @ApiNotFoundResponse({
    description: 'Resolution not found',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Resolution identifier',
  })
  findOne(@Param('id') id: string) {
    return this.resolutionsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a resolution',
    description: 'This will update a resolution by its ID',
  })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: ResolutionDto,
  })
  @ApiNotFoundResponse({
    description: 'Resolution not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Resolution identifier',
  })
  update(
    @Param('id') id: string,
    @Body() updateResolutionDto: UpdateResolutionDto,
  ) {
    return this.resolutionsService.update(id, updateResolutionDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove a resolution',
    description: 'This will remove a resolution by its ID',
  })
  @ApiNoContentResponse({
    description: 'The record has been successfully removed.',
  })
  @ApiNotFoundResponse({
    description: 'Resolution not found',
  })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.resolutionsService.remove(id);
  }
}
