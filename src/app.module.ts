import { Module } from '@nestjs/common';
import { ConfigModule } from './configs/configs.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [ConfigModule, ResourcesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
