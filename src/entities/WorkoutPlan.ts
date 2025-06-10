// src/entity/WorkoutPlan.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Member } from './Member';
import { Trainer } from './Trainer';
import { WorkoutSession } from './WorkoutSession';


@Entity()
export class WorkoutPlan {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @Column('text')
    description!: string;

    @ManyToOne(() => Member, (member) => member.workoutPlans)
    member!: Member;

    @ManyToOne(() => Trainer, (trainer) => trainer.workoutPlans)
    trainer!: Trainer;

    @OneToMany(() => WorkoutSession, (session) => session.workoutPlan)
    sessions!: WorkoutSession[];
}