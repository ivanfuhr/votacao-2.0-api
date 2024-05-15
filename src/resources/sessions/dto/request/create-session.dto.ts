import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

const ONE_MINUTE_VALUE = 1000 * 60;

export class CreateSessionDto {
  @IsNotEmpty({ message: 'Resolution ID is required' })
  @IsUUID(4, { message: 'Resolution ID must be a valid UUID' })
  @ApiProperty({
    description: 'Resolution ID of the session',
    type: String,
    required: true,
    example: '5561cda1-f738-46b7-8a8c-e0c9c802525f',
  })
  resolutionId: string;

  @IsNotEmpty({ message: 'Start date is required' })
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    description: 'Start date of the session',
    type: Date,
    required: true,
    example: new Date(new Date().getTime() + ONE_MINUTE_VALUE).toISOString(),
  })
  startAt: Date;

  @IsOptional()
  @Transform(({ value }) =>
    value ? new Date(value) : new Date(Date.now() + ONE_MINUTE_VALUE),
  )
  @Type(() => Date)
  @IsDate({ message: 'End date must be a valid date' })
  @ApiProperty({
    description: 'End date of the session',
    type: Date,
    example: new Date(
      new Date().getTime() + ONE_MINUTE_VALUE * 5,
    ).toISOString(),
    default: new Date(Date.now() + ONE_MINUTE_VALUE),
  })
  endAt: Date;
}
