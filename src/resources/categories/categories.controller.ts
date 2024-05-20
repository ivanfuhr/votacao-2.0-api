import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { CATEGORIES_SERVICE_TOKEN } from './categories.constants';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { CategoryDto } from './dto/response/category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    @Inject(CATEGORIES_SERVICE_TOKEN)
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a category',
    description: 'This will create a new category',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CategoryDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all categories',
    description: 'This will return all categories',
  })
  @ApiOkResponse({
    description: 'List all categories',
    type: [CategoryDto],
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a category',
    description: 'This will get a category by ID',
  })
  @ApiOkResponse({
    description: 'Get a category by ID',
    type: CategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @ApiParam({
    name: 'id',
    description: 'Category ID',
    schema: {
      type: 'string',
      format: 'uuid',
    },
    required: true,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a category',
    description: 'This will update a category by ID',
  })
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
    type: CategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @ApiParam({
    name: 'id',
    description: 'Category ID',
    schema: {
      type: 'string',
      format: 'uuid',
    },
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a category',
    description: 'This will delete a category by ID',
  })
  @ApiNoContentResponse({
    description: 'The record has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @ApiParam({
    name: 'id',
    description: 'Category ID',
    schema: {
      type: 'string',
      format: 'uuid',
    },
    required: true,
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.categoriesService.remove(id);
  }
}
