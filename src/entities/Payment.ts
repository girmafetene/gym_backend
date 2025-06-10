// src/entity/Payment.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('decimal')
    amount!: number;

    @Column()
    method!: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    date!: Date;
}