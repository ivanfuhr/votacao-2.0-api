import { Test, TestingModule } from '@nestjs/testing';
import { CreateSessionDto } from './dto/request/create-session.dto';
import { SESSIONS_SERVICE_TOKEN } from './sessions.constants';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

const oneSession: CreateSessionDto = {
  endAt: new Date(),
  startAt: new Date(),
  resolutionId: '1',
};

describe('SessionsController', () => {
  let controller: SessionsController;
  let service: SessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SessionsController],
      providers: [
        {
          provide: SESSIONS_SERVICE_TOKEN,
          useValue: {
            create: jest.fn(),
            findAllActive: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SessionsController>(SessionsController);
    service = module.get<SessionsService>(SESSIONS_SERVICE_TOKEN);
  });

  describe('create', () => {
    it('should return a new session given valid data', async () => {
      await controller.create(oneSession);
      expect(service.create).toHaveBeenCalledWith(oneSession);
    });
  });

  describe('findAllActive', () => {
    it('should return an array of sessions', async () => {
      await controller.findAllActive();
      expect(service.findAllActive).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a session given a valid id', async () => {
      await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should return a session given a valid id and data', async () => {
      await controller.update('1', oneSession);
      expect(service.update).toHaveBeenCalledWith('1', oneSession);
    });
  });

  describe('remove', () => {
    it('should return a session given a valid id', async () => {
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});
