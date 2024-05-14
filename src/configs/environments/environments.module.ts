import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentsService } from './environments.service';
import { configValidator } from './environments.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: configValidator,
    }),
  ],
  providers: [EnvironmentsService],
  exports: [EnvironmentsService],
})
export class EnvironmentsModule {}
