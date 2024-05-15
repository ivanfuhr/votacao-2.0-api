import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { EnvironmentsModule } from './environments/environments.module';
import { EnvironmentsService } from './environments/environments.service';

@Module({
  imports: [
    EnvironmentsModule,
    TypeOrmModule.forRootAsync({
      useFactory: (
        environmentsService: EnvironmentsService,
      ): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: environmentsService.get('DATABASE_HOST'),
        port: environmentsService.get('DATABASE_PORT'),
        username: environmentsService.get('DATABASE_USER'),
        password: environmentsService.get('DATABASE_PASSWORD'),
        database: environmentsService.get('DATABASE_NAME'),
        entities: [
          path.join(
            __dirname,
            '..',
            'resources',
            '**',
            'entities',
            '*.entity{.ts,.js}',
          ),
        ],
        autoLoadEntities: true,
        synchronize: true,
      }),
      imports: [EnvironmentsModule],
      inject: [EnvironmentsService],
    }),
  ],
})
export class ConfigModule {}
