// src/entity/WorkoutSession.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WorkoutPlan } from './WorkoutPlan';

@Entity()
export class WorkoutSession {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    sets!: number;

    @Column()
    reps!: number;

    @ManyToOne(() => WorkoutPlan, (plan) => plan.sessions)
    workoutPlan!: WorkoutPlan;
}