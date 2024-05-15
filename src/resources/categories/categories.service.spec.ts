import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { CategoryDto } from './dto/response/category.dto';
import { Category } from './entities/category.entity';

const oneCategory: Category = {
  id: '5ce019c5-f212-4d92-96c2-c8385fe5ee8c',
  title: 'Test Category',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const invalidUuid = 'invalid-uuid';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            create: jest.fn((data) => data),
            save: jest.fn((data) => data),
            merge: jest.fn((data, update) => ({ ...data, ...update })),
            find: jest.fn(() => [oneCategory]),
            findOne: jest.fn(({ where }: { where: { id: string } }) => {
              if (where.id === oneCategory.id) {
                return oneCategory;
              }

              throw new Error();
            }),
            remove: jest.fn((data) => true),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  describe('create', () => {
    it('should return a new category given valid data', async () => {
      const categoryData = new CreateCategoryDto();
      categoryData.title = 'Test Category';

      const categoryAct = await service.create(categoryData);

      expect(categoryAct).toBeDefined();
      expect(categoryAct.title).toEqual(categoryData.title);
      expect(categoryAct).toBeInstanceOf(CategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categoryAct = await service.findAll();

      expect(categoryAct).toBeDefined();
      expect(categoryAct).toBeInstanceOf(Array);
      expect(categoryAct[0]).toBeInstanceOf(CategoryDto);
    });
  });

  describe('findOne', () => {
    it('should return a category given a valid id', async () => {
      const categoryAct = await service.findOne(oneCategory.id);

      expect(categoryAct).toBeDefined();
      expect(categoryAct).toBeInstanceOf(CategoryDto);
    });

    it('should throw an error if the id is not a valid uuid', async () => {
      await expect(service.findOne(invalidUuid)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should return a category given a valid id and data', async () => {
      const categoryData = new UpdateCategoryDto();
      categoryData.title = 'Test Category';

      const categoryAct = await service.update(oneCategory.id, categoryData);

      expect(categoryAct).toBeDefined();
      expect(categoryAct.title).toEqual(categoryData.title);
      expect(categoryAct).toBeInstanceOf(CategoryDto);
    });

    it('should throw an error if the id is not a valid uuid', async () => {
      const categoryData = new UpdateCategoryDto();
      categoryData.title = 'Test Category';

      await expect(service.update(invalidUuid, categoryData)).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should return a category given a valid id', async () => {
      const categoryAct = await service.remove(oneCategory.id);

      expect(categoryAct).toBeDefined();
      expect(categoryAct).toBe(true);
    });

    it('should throw an error if the id is not a valid uuid', async () => {
      await expect(service.remove(invalidUuid)).rejects.toThrow();
    });
  });
});
