// src/entity/MembershipPlan.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class MembershipPlan {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column('decimal')
    price!: number;

    @Column()
    durationInDays!: number;
}
