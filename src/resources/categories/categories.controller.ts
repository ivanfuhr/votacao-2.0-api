import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { CategoryDto } from './dto/response/category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

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
    type: 'string',
    required: true,
  })
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
    type: 'string',
    required: true,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data provided',
  })
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
    type: 'string',
    required: true,
  })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.categoriesService.remove(id);
  }
}
