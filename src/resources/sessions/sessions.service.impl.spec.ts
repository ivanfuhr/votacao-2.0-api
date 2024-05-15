import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RESOLUTIONS_SERVICE_TOKEN } from '../resolutions/resolutions.constants';
import { oneResolution } from '../resolutions/resolutions.service.impl.spec';
import { CreateSessionDto } from './dto/request/create-session.dto';
import { SessionDto } from './dto/response/session.dto';
import { Session } from './entities/session.entity';
import { SessionsService } from './sessions.service';
import { SessionsServiceImpl } from './sessions.service.impl';

const oneSession = {
  id: 'c9000b17-9ca9-4065-996f-c35ddf28c39c',
  endAt: new Date(Date.now() + 1000000),
  startAt: new Date(Date.now() + 500000),
  resolutionId: oneResolution.id,
};

const invalidUuid = 'invalid-uuid';

describe('SessionsServiceImpl', () => {
  let service: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsServiceImpl,
        {
          provide: getRepositoryToken(Session),
          useValue: {
            create: jest.fn((data) => data),
            save: jest.fn((data) => data),
            merge: jest.fn((data, update) => ({ ...data, ...update })),
            findOne: jest.fn(({ where }: { where: { id: string } }) => {
              if (where.id === oneSession.id) {
                return oneSession;
              }

              throw new Error();
            }),
            remove: jest.fn((data) => true),
            createQueryBuilder: jest.fn(() => ({
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              getOne: jest.fn(() => null),
              getMany: jest.fn(() => [oneSession]),
            })),
          },
        },
        {
          provide: RESOLUTIONS_SERVICE_TOKEN,
          useValue: {
            findOne: jest.fn(() => oneResolution),
          },
        },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsServiceImpl);
  });

  describe('create', () => {
    it('should return a new session given valid data', async () => {
      const sessionData = new CreateSessionDto();
      sessionData.startAt = oneSession.startAt;
      sessionData.endAt = oneSession.endAt;
      sessionData.resolutionId = oneSession.resolutionId;

      const sessionAct = await service.create(sessionData);

      expect(sessionAct).toBeDefined();
      expect(sessionAct).toBeInstanceOf(SessionDto);
    });

    it('should throw an error if start date is after end date', async () => {
      const sessionData = new CreateSessionDto();
      sessionData.startAt = new Date(Date.now() + 1000000);
      sessionData.endAt = new Date(Date.now() + 500000);
      sessionData.resolutionId = oneSession.resolutionId;

      await expect(service.create(sessionData)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if start date is in the past', async () => {
      const sessionData = new CreateSessionDto();
      sessionData.startAt = new Date(Date.now() - 1000000);
      sessionData.endAt = new Date(Date.now() + 500000);
      sessionData.resolutionId = oneSession.resolutionId;

      await expect(service.create(sessionData)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAllActive', () => {
    it('should return an array of active sessions', async () => {
      const sessions = await service.findAllActive();

      expect(sessions).toBeDefined();
      expect(sessions.length).toBeGreaterThan(0);
      expect(sessions[0]).toBeInstanceOf(SessionDto);
    });
  });

  describe('findOne', () => {
    it('should return a session given a valid id', async () => {
      const session = await service.findOne(oneSession.id);

      expect(session).toBeDefined();
      expect(session).toBeInstanceOf(SessionDto);
    });

    it('should throw an error given an invalid id', async () => {
      await expect(service.findOne(invalidUuid)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should return an updated session given valid data', async () => {
      const sessionData = new CreateSessionDto();
      sessionData.startAt = new Date(Date.now() + 500000);
      sessionData.endAt = new Date(Date.now() + 1000000);
      sessionData.resolutionId = oneResolution.id;

      const sessionAct = await service.update(oneSession.id, sessionData);

      expect(sessionAct).toBeDefined();
      expect(sessionAct).toBeInstanceOf(SessionDto);
    });

    it('should throw an error if start date is after end date', async () => {
      const sessionData = new CreateSessionDto();
      sessionData.startAt = new Date(Date.now() + 1000000);
      sessionData.endAt = new Date(Date.now() + 500000);
      sessionData.resolutionId = oneResolution.id;

      await expect(service.update(oneSession.id, sessionData)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw an error if start date is in the past', async () => {
      const sessionData = new CreateSessionDto();
      sessionData.startAt = new Date(Date.now() - 1000000);
      sessionData.endAt = new Date(Date.now() + 500000);
      sessionData.resolutionId = oneResolution.id;

      await expect(service.update(oneSession.id, sessionData)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a session given a valid id', async () => {
      await expect(service.remove(oneSession.id)).resolves.not.toThrow();
    });

    it('should throw an error given an invalid id', async () => {
      await expect(service.remove(invalidUuid)).rejects.toThrow();
    });
  });
});
