import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { VoteType } from '../../enums/vote-type.enum';

export class CreateVoteDto {
  @IsNotEmpty({ message: 'Vote is required' })
  @IsEnum(VoteType, { message: 'Vote must be either "yes" or "no"' })
  @ApiProperty({
    description: 'Vote type',
    enum: VoteType,
    example: VoteType.YES,
    required: true,
  })
  vote: VoteType;

  @IsNotEmpty({ message: 'Session ID is required' })
  @IsUUID('4', { message: 'Invalid Session ID' })
  @ApiProperty({
    description: 'Session ID',
    example: 'b76dbef1-d32b-48de-8d0d-a3372b3140df',
    required: true,
  })
  sessionId: string;
}
