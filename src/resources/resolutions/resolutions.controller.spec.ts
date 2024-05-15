import { Test, TestingModule } from '@nestjs/testing';
import { RESOLUTIONS_SERVICE_TOKEN } from './resolutions.constants';
import { ResolutionsController } from './resolutions.controller';
import { ResolutionsService } from './resolutions.service';

const oneResolution = {
  title: 'Test Resolution',
  description: 'Test Description',
  categoryId: '3108a0e7-bbcf-40c3-a420-dd03c3782c10',
};

const resolutionId = '3108a0e7-bbcf-40c3-a420-dd03c3782c10';

describe('ResolutionsController', () => {
  let controller: ResolutionsController;
  let service: ResolutionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResolutionsController],
      providers: [
        {
          provide: RESOLUTIONS_SERVICE_TOKEN,
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

    controller = module.get<ResolutionsController>(ResolutionsController);
    service = module.get<ResolutionsService>(RESOLUTIONS_SERVICE_TOKEN);
  });

  describe('create', () => {
    it('should return a new resolution given valid data', async () => {
      await controller.create(oneResolution);
      expect(service.create).toHaveBeenCalledWith(oneResolution);
    });
  });

  describe('findAll', () => {
    it('should return an array of resolutions', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a resolution given a valid id', async () => {
      await controller.findOne(resolutionId);
      expect(service.findOne).toHaveBeenCalledWith(resolutionId);
    });
  });

  describe('update', () => {
    it('should return a resolution given a valid id and data', async () => {
      await controller.update(resolutionId, oneResolution);
      expect(service.update).toHaveBeenCalledWith(resolutionId, oneResolution);
    });
  });

  describe('remove', () => {
    it('should return a resolution given a valid id', async () => {
      await controller.remove(resolutionId);
      expect(service.remove).toHaveBeenCalledWith(resolutionId);
    });
  });
});
