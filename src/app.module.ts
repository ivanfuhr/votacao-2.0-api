import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/configs.module';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
