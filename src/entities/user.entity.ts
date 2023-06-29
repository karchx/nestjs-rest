import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  Index,
} from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Index()
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.user)
  tasks: TaskEntity[];

  @Column({ type: 'timestamp', default: new Date() })
  created_at: string;
}
