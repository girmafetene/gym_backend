// src/entity/Member.ts
import { Entity, OneToMany } from 'typeorm';
import { User } from './User';
import { Subscription } from './Subscription';
import { Attendance } from './Attendance';
import { WorkoutPlan } from './WorkoutPlan';
import { DietPlan } from './DietPlan';

@Entity()
export class Member extends User {
    @OneToMany(() => Subscription, (sub) => sub.member)
    subscriptions!: Subscription[];

    @OneToMany(() => Attendance, (attendance) => attendance.member)
    attendances!: Attendance[];

    @OneToMany(() => WorkoutPlan, (wp) => wp.member)
    workoutPlans!: WorkoutPlan[];

    @OneToMany(() => DietPlan, (dp) => dp.member)
    dietPlans!: DietPlan[];
}
