// src/entity/Subscription.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Member } from './Member';
import { MembershipPlan } from './MembershipPlan';
import { Payment } from './Payment';

@Entity()
export class Subscription {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Member, (member) => member.subscriptions)
    member!: Member;

    @OneToOne(() => MembershipPlan)
    @JoinColumn()
    plan!: MembershipPlan;

    @OneToOne(() => Payment, { cascade: true })
    @JoinColumn()
    payment!: Payment;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;
}