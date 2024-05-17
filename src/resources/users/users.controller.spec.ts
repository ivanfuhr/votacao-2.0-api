import { Test, TestingModule } from '@nestjs/testing';
import { Role } from './enums/role.enum';
import { USERS_SERVICE_TOKEN } from './users.constants';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const oneUser = {
  id: 'a98583f1-6bb2-422f-87ff-d291a62e6108',
  name: 'John Doe',
  document: '000.000.000-00',
  password: 'not-secret-password',
  confirmPassword: 'not-secret-password',
  role: Role.USER,
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: USERS_SERVICE_TOKEN,
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

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(USERS_SERVICE_TOKEN);
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should call service create', async () => {
      await controller.create(oneUser);

      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should call service findAll', async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should call service findOne', async () => {
      await controller.findOne('id');

      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should call service update', async () => {
      await controller.update('id', {
        ...oneUser,
        newPassword: 'new-password',
        confirmPassword: 'new-password',
      });

      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('should call service remove', async () => {
      await controller.remove('id');

      expect(service.remove).toHaveBeenCalled();
    });
  });
});
