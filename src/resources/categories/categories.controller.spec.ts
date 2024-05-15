import { Test, TestingModule } from '@nestjs/testing';
import { CATEGORIES_SERVICE_TOKEN } from './categories.constants';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

const oneCategory = {
  title: 'Test Category',
};

const validUuid = '3108a0e7-bbcf-40c3-a420-dd03c3782c10';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CATEGORIES_SERVICE_TOKEN,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CATEGORIES_SERVICE_TOKEN);
  });

  describe('create', () => {
    it('should return a new category given valid data', async () => {
      await controller.create(oneCategory);
      expect(service.create).toHaveBeenCalledWith(oneCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a category given a valid id', async () => {
      await controller.findOne(validUuid);
      expect(service.findOne).toHaveBeenCalledWith(validUuid);
    });
  });

  describe('update', () => {
    it('should return a category given a valid id and data', async () => {
      await controller.update(validUuid, oneCategory);
      expect(service.update).toHaveBeenCalledWith(validUuid, oneCategory);
    });
  });

  describe('remove', () => {
    it('should return a category given a valid id', async () => {
      await controller.remove(validUuid);
      expect(service.remove).toHaveBeenCalledWith(validUuid);
    });
  });
});
