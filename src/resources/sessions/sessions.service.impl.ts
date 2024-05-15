import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { RESOLUTIONS_SERVICE_TOKEN } from '../resolutions/resolutions.constants';
import { ResolutionsService } from '../resolutions/resolutions.service';
import { CreateSessionDto } from './dto/request/create-session.dto';
import { UpdateSessionDto } from './dto/request/update-session.dto';
import { SessionDto } from './dto/response/session.dto';
import { Session } from './entities/session.entity';
import { SessionMapper } from './mappers/session.mapper';
import { SessionsService } from './sessions.service';

@Injectable()
export class SessionsServiceImpl implements SessionsService {
  constructor(
    @InjectRepository(Session)
    private resolutionRepository: Repository<Session>,

    @Inject(RESOLUTIONS_SERVICE_TOKEN)
    private resolutionsService: ResolutionsService,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<SessionDto> {
    const resolution = await this.resolutionsService.findOne(
      createSessionDto.resolutionId,
    );

    const sessionData = this.resolutionRepository.create({
      ...createSessionDto,
      resolution,
    });

    await this.validadeSession(sessionData);

    const session = await this.resolutionRepository.save(sessionData);

    return SessionMapper.sessionEntityToDto({ ...session, resolution });
  }

  async findAllActive(): Promise<SessionDto[]> {
    const sessions = await this.resolutionRepository
      .createQueryBuilder('session')
      .where('NOW() BETWEEN session.start_at AND session.end_at')
      .getMany();

    return sessions.map((session) => SessionMapper.sessionEntityToDto(session));
  }

  async findOne(id: string): Promise<SessionDto> {
    const session = await this.findSessionByIdOrFail(id);

    return SessionMapper.sessionEntityToDto(session);
  }

  async update(
    id: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<SessionDto> {
    const session = await this.findSessionByIdOrFail(id);

    const resolution = await this.resolutionsService.findOne(
      updateSessionDto.resolutionId,
    );

    const sessionData = this.resolutionRepository.merge(session, {
      ...updateSessionDto,
      resolution,
    });

    await this.validadeSession(sessionData, id);

    await this.resolutionRepository.save(sessionData);

    return SessionMapper.sessionEntityToDto({ ...sessionData, resolution });
  }

  async remove(id: string): Promise<void> {
    const session = await this.findSessionByIdOrFail(id);

    this.resolutionRepository.remove(session);
  }

  private async validadeSession(session: Session, id?: string): Promise<void> {
    if (session.startAt > session.endAt) {
      throw new BadRequestException('Start date must be before end date');
    }

    if (session.startAt < new Date()) {
      throw new BadRequestException('Start date must be in the future');
    }

    const existingSession = await this.resolutionRepository
      .createQueryBuilder('session')
      .where('session.resolution_id = :resolutionId', {
        id: Not(id),
        resolutionId: session.resolution.id,
      })
      .andWhere('session.startAt <= :endAt', { endAt: session.endAt })
      .andWhere('session.endAt >= :startAt', { startAt: session.startAt })
      .getOne();

    if (existingSession) {
      throw new BadRequestException(
        'There is already a session in this period',
      );
    }
  }

  private async findSessionByIdOrFail(id: string): Promise<Session> {
    const session = await this.resolutionRepository.findOne({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }
}
