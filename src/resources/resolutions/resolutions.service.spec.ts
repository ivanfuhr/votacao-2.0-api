import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateResolutionDto } from './dto/request/create-resolution.dto';
import { ResolutionDto } from './dto/response/resolution.dto';
import { Resolution } from './entities/resolution.entity';
import { ResolutionsService } from './resolutions.service';

const oneResolution: Resolution = {
  id: '42f1c3b2-6d0a-41bd-a9d0-61c4c7be0ddf',
  title: 'Test Resolution',
  description: 'Test Description',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const invalidUuid = 'invalid-uuid';

describe('ResolutionsService', () => {
  let service: ResolutionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResolutionsService,
        {
          provide: getRepositoryToken(Resolution),
          useValue: {
            create: jest.fn((data) => data),
            merge: jest.fn((data, update) => ({ ...data, ...update })),
            save: jest.fn((data) => data),
            createQueryBuilder: jest.fn(() => ({
              orderBy: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              offset: jest.fn().mockReturnThis(),
              getCount: jest.fn().mockResolvedValue(1),
              getMany: jest.fn().mockResolvedValue([oneResolution]),
            })),
            findOne: jest.fn(({ where }: { where: { id: string } }) => {
              if (where.id === oneResolution.id) {
                return oneResolution;
              }

              throw new Error();
            }),
            remove: jest.fn((data) => true),
          },
        },
      ],
    }).compile();

    service = module.get<ResolutionsService>(ResolutionsService);
  });

  describe('create', () => {
    it('should return a new resolution given valid data', async () => {
      const resolutionData = new CreateResolutionDto();
      resolutionData.title = 'Test Resolution';
      resolutionData.description = 'Test Description';

      const resolutionAct = await service.create(resolutionData);

      expect(resolutionAct).toBeDefined();
      expect(resolutionAct.title).toEqual(resolutionData.title);
      expect(resolutionAct.description).toEqual(resolutionData.description);
      expect(resolutionAct).toBeInstanceOf(ResolutionDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of resolutions', async () => {
      const resolutions = await service.findAll({ page: 1, limit: 10 });

      expect(resolutions).toBeDefined();
      expect(resolutions.data).toBeDefined();
      expect(resolutions.data.length).toBeGreaterThan(0);
      expect(resolutions.data[0].id).toEqual(oneResolution.id);
      expect(resolutions.data[0].title).toEqual(oneResolution.title);
      expect(resolutions.data[0].description).toEqual(
        oneResolution.description,
      );
      expect(resolutions.data[0].createdAt).toEqual(oneResolution.createdAt);
      expect(resolutions.data[0].updatedAt).toEqual(oneResolution.updatedAt);
    });
  });

  describe('findOne', () => {
    it('should return a resolution given a valid id', async () => {
      const resolution = await service.findOne(oneResolution.id);

      expect(resolution).toBeDefined();
      expect(resolution.id).toEqual(oneResolution.id);
      expect(resolution.title).toEqual(oneResolution.title);
      expect(resolution.description).toEqual(oneResolution.description);
      expect(resolution.createdAt).toEqual(oneResolution.createdAt);
      expect(resolution.updatedAt).toEqual(oneResolution.updatedAt);
    });

    it('should throw an error given an invalid id', async () => {
      await expect(service.findOne(invalidUuid)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should return an updated resolution given valid data', async () => {
      const resolutionData = new CreateResolutionDto();
      resolutionData.title = 'Updated Title';
      resolutionData.description = 'Updated Description';

      const resolutionAct = await service.update(
        oneResolution.id,
        resolutionData,
      );

      expect(resolutionAct).toBeDefined();
      expect(resolutionAct.id).toEqual(oneResolution.id);
      expect(resolutionAct.title).toEqual(resolutionData.title);
      expect(resolutionAct.description).toEqual(resolutionData.description);
      expect(resolutionAct).toBeInstanceOf(ResolutionDto);
    });

    it('should throw an error given an invalid id', async () => {
      const resolutionData = new CreateResolutionDto();
      resolutionData.title = 'Updated Title';
      resolutionData.description = 'Updated Description';

      await expect(
        service.update(invalidUuid, resolutionData),
      ).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should return true given a valid id', async () => {
      const result = await service.remove(oneResolution.id);

      expect(result).toBeTruthy();
    });

    it('should throw an error given an invalid id', async () => {
      await expect(service.remove(invalidUuid)).rejects.toThrow();
    });
  });
});
