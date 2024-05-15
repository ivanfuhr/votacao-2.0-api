import { Resolution } from 'src/resources/resolutions/entities/resolution.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Resolution, { cascade: true })
  @JoinColumn({ name: 'resolution_id' })
  resolution: Resolution;

  @CreateDateColumn({ type: 'timestamp', name: 'start_at' })
  startAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'end_at' })
  endAt: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
