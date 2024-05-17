import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HashHelper } from 'src/common/helpers/hash.helper';
import { UserDto } from './dto/response/user.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';
import { UsersService } from './users.service';
import { UsersServiceImpl } from './users.service.impl';

const oneUser = {
  id: 'a98583f1-6bb2-422f-87ff-d291a62e6108',
  name: 'John Doe',
  document: '000.000.000-00',
  password: 'not-secret-password',
  confirmPassword: 'not-secret-password',
  role: Role.USER,
};

describe('UsersServiceImpl', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersServiceImpl,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockResolvedValue(oneUser),
            merge: jest.fn().mockReturnValue(oneUser),
            save: jest.fn().mockResolvedValue(oneUser),
            findOne: jest.fn((query) => {
              if (
                query.where.document &&
                query.where.document === '000.000.000-01'
              ) {
                return oneUser;
              }

              if (query.where.id && query.where.id === oneUser.id) {
                return oneUser;
              }

              return null;
            }),
            find: jest.fn().mockResolvedValue([oneUser]),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersServiceImpl);
  });

  describe('create', () => {
    it('should throw BadRequestException if passwords do not match', async () => {
      await expect(
        service.create({
          ...oneUser,
          confirmPassword: 'wrong-password',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create a user successfully', async () => {
      jest.spyOn(HashHelper, 'hash').mockResolvedValue('hashed-password');

      const result = await service.create(oneUser);

      expect(HashHelper.hash).toHaveBeenCalledWith(oneUser.password);
      expect(result).toBeInstanceOf(UserDto);
    });

    it('should throw BadRequestException if document is already in use', async () => {
      await expect(
        service.create({
          ...oneUser,
          document: '000.000.000-01',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();

      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBeInstanceOf(UserDto);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = await service.findOne(oneUser.id);

      expect(result).toBeInstanceOf(UserDto);
    });
  });

  describe('update', () => {
    it('should throw BadRequestException if passwords do not match', async () => {
      await expect(
        service.update(oneUser.id, {
          newPassword: 'new-password',
          confirmPassword: 'wrong-password',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should update a user successfully', async () => {
      jest.spyOn(HashHelper, 'hash').mockResolvedValue('hashed-password');

      const result = await service.update(oneUser.id, {
        name: 'Jane Doe',
        newPassword: 'new-password',
        confirmPassword: 'new-password',
      });

      expect(HashHelper.hash).toHaveBeenCalledWith('new-password');
      expect(result).toBeInstanceOf(UserDto);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await service.remove(oneUser.id);

      expect(result).toBeUndefined();
    });
  });
});
