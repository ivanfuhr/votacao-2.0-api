import { CreateSessionDto } from './dto/request/create-session.dto';
import { UpdateSessionDto } from './dto/request/update-session.dto';
import { SessionDto } from './dto/response/session.dto';

export interface SessionsService {
  create(createSessionDto: CreateSessionDto): Promise<SessionDto>;

  findAllActive(): Promise<SessionDto[]>;

  findOne(id: string): Promise<SessionDto>;

  update(id: string, updateSessionDto: UpdateSessionDto): Promise<SessionDto>;

  remove(id: string): Promise<void>;
}
