import { Category } from 'src/resources/categories/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('resolutions')
export class Resolution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Category, { cascade: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  description: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
