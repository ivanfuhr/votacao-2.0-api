import { plainToClass } from 'class-transformer';
import {
  IsAlpha,
  IsDefined,
  IsNumber,
  IsString,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

export class EnvironmentsSchema {
  @IsDefined()
  @IsNumber()
  @Min(1024)
  DATABASE_PORT: number;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_HOST: string;

  @IsDefined()
  @IsAlpha()
  @MinLength(1)
  DATABASE_USER: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_PASSWORD: string;

  @IsDefined()
  @IsString()
  @MinLength(1)
  DATABASE_NAME: string;
}

export function configValidator(configuration: Record<string, any>) {
  const finalConfig = plainToClass(EnvironmentsSchema, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return finalConfig;
}
