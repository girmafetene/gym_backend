// src/entity/DietPlan.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Member } from './Member';
import { Trainer } from './Trainer';
import { DietItem } from './DietItem';


@Entity()
export class DietPlan {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title!: string;

    @ManyToOne(() => Member, (member) => member.dietPlans)
    member!: Member;

    @ManyToOne(() => Trainer, (trainer) => trainer.dietPlans)
    trainer!: Trainer;

    @OneToMany(() => DietItem, (item) => item.dietPlan, { cascade: true })
    items!: DietItem[];
}