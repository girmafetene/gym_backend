// Full Entity Definitions for Gym Management System

// ----------------------
// src/entity/Admin.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne(() => User)
    @JoinColumn()
    user!: User;

    @Column()
    position!: string;
}