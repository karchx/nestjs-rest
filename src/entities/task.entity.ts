import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, Index } from "typeorm";
import { UserEntity } from "./user.entity";

export enum TaskStatus {
    TODO = "ToDo",
    INPROGRESS = "InProgress",
    DONE = "DONE"
}

@Entity("task") 
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    email: string;
    
    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.TODO
    })
    status: TaskStatus;

    @Index()
    @ManyToOne(() => UserEntity, (user: UserEntity) => user.tasks) user: UserEntity;

    @Column({ type: "timestamp", default: new Date() })
    created_at: string;
}