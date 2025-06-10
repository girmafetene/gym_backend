// src/entity/Schedule.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trainer } from './Trainer';

@Entity()
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Trainer, (trainer) => trainer.schedules)
    trainer!: Trainer;

    @Column()
    day!: string;

    @Column()
    startTime!: string;

    @Column()
    endTime!: string;

    @Column()
    activity!: string;
}
