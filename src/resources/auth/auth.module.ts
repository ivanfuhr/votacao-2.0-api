import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvironmentsModule } from 'src/configs/environments/environments.module';
import { EnvironmentsService } from 'src/configs/environments/environments.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    EnvironmentsModule,
    JwtModule.registerAsync({
      useFactory: (environmentsService: EnvironmentsService) => ({
        secret: environmentsService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: environmentsService.get('JWT_EXPIRES_IN'),
        },
      }),
      imports: [EnvironmentsModule],
      inject: [EnvironmentsService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
