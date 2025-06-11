// src/entity/Item.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
} from 'typeorm';

@Entity()
export class Item extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ nullable: true })
    category!: string;


    @Column({ default: true })
    isAvailable!: boolean;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
}
