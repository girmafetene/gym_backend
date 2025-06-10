// src/entity/User.ts
import {
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';


export enum UserRole {
    MEMBER = 'Member',
    TRAINER = 'Trainer',
    ADMIN = 'Admin'
}

export abstract class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    fullName!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    phone!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
    })
    role!: UserRole;

    @CreateDateColumn({ default: () => new Date() })
    createdAt!: Date;

    @UpdateDateColumn({ default: () => new Date() })
    updatedAt!: Date;
}
