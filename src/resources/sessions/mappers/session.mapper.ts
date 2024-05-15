import { plainToClass } from 'class-transformer';
import { SessionDto } from '../dto/response/session.dto';
import { Session } from '../entities/session.entity';

export abstract class SessionMapper {
  static sessionEntityToDto(session: Session): SessionDto {
    return plainToClass(SessionDto, session, {
      excludeExtraneousValues: true,
    });
  }
}
