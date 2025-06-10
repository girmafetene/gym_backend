import "reflect-metadata";
import { DataSource } from "typeorm";
import { Attendance } from "../entities/Attendance";
import { DietItem } from "../entities/DietItem";
import { DietPlan } from "../entities/DietPlan";
import { Member } from "../entities/Member";
import { MembershipPlan } from "../entities/MembershipPlan";
import { Payment } from "../entities/Payment";
import { Schedule } from "../entities/Schedule";
import { Subscription } from "../entities/Subscription";
import { Trainer } from "../entities/Trainer";
import { WorkoutPlan } from "../entities/WorkoutPlan";
import { WorkoutSession } from "../entities/WorkoutSession";
import { User } from "../entities/User";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "gym_management",
    synchronize: true,
    logging: false,
    entities: [Attendance, DietItem, DietPlan, Member, MembershipPlan, User, Payment, Schedule, Subscription, Trainer, WorkoutPlan, WorkoutSession],
    migrations: [],
    subscribers: [],
});