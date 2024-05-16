import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { VoteType } from '../../enums/vote-type.enum';

export class VoteDto {
  @Expose()
  @ApiProperty({
    description: 'The id of the vote',
    example: 'b76dbef1-d32b-48de-8d0d-a3372b3140df',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The type of the vote',
    example: VoteType.YES,
    enum: VoteType,
  })
  vote: VoteType;

  @Expose()
  @ApiProperty({
    description: 'The session ID of the vote',
    example: 'b76dbef1-d32b-48de-8d0d-a3372b3140df',
  })
  sessionId: string;

  @Expose()
  @ApiProperty({
    example: '2021-09-17T18:15:19.000Z',
    description: 'The date when the vote was created',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2021-09-17T18:15:19.000Z',
    description: 'The date when the vote was last updated',
  })
  updatedAt: Date;
}
