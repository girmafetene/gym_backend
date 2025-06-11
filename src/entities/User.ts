// src/entity/User.ts
import {
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    Entity
} from 'typeorm';

export enum UserRole {
    MEMBER = 'Member',
    TRAINER = 'Trainer',
    ADMIN = 'Admin'
}

@Entity()
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

    @Column({ nullable: true })
    photoPath!: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt!: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date;
}
