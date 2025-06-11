import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
} from 'typeorm';

@Entity()
export class Equipment extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description!: string;

    @Column()
    quantity!: number;

    @Column({ nullable: true })
    location!: string;

    @Column({ default: true })
    isActive!: boolean;

    @Column({ nullable: true })
    imagePath!: string;

    @Column({ nullable: true })
    videoPath!: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

    // @BeforeUpdate()
    // updateTimestamp() {
    //     this.updatedAt = new Date();
    // }
}
