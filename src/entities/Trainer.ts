// src/entity/Trainer.ts
import { Entity, OneToMany } from 'typeorm';
import { User } from './User';
import { WorkoutPlan } from './WorkoutPlan';
import { DietPlan } from './DietPlan';
import { Schedule } from './Schedule';

@Entity()
export class Trainer extends User {
    @OneToMany(() => WorkoutPlan, (wp) => wp.trainer)
    workoutPlans!: WorkoutPlan[];

    @OneToMany(() => DietPlan, (dp) => dp.trainer)
    dietPlans!: DietPlan[];

    @OneToMany(() => Schedule, (schedule) => schedule.trainer)
    schedules!: Schedule[];
}