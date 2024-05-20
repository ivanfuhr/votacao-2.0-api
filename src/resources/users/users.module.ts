import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { USERS_SERVICE_TOKEN } from './users.constants';
import { UsersController } from './users.controller';
import { UsersServiceImpl } from './users.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: USERS_SERVICE_TOKEN,
      useClass: UsersServiceImpl,
    },
  ],
  exports: [USERS_SERVICE_TOKEN],
})
export class UsersModule {}
