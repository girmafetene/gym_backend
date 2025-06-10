import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from './Member';

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => Member, (member) => member.attendances)
    member!: Member;

    @Column()
    date!: Date;
}
