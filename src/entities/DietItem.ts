// src/entity/DietItem.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DietPlan } from './DietPlan';

@Entity()
export class DietItem {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    foodName!: string;

    @Column()
    quantity!: string;

    @Column()
    time!: string;

    @ManyToOne(() => DietPlan, (plan) => plan.items)
    dietPlan!: DietPlan;
}