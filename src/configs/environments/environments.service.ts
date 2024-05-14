import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentsSchema } from './environments.validator';

@Injectable()
export class EnvironmentsService {
  constructor(private configService: ConfigService<EnvironmentsSchema, true>) {}

  get<T extends keyof EnvironmentsSchema>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
