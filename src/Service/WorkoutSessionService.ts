// src/services/WorkoutSessionService.ts

import AppDataSource from '../config/data-source';
import { WorkoutSession } from '../entities/WorkoutSession';
import { Repository } from 'typeorm';

export class WorkoutSessionService {
    private repo: Repository<WorkoutSession>;

    constructor() {
        this.repo = AppDataSource.getRepository(WorkoutSession);
    }

    async create(data: Partial<WorkoutSession>) {
        const session = this.repo.create(data);
        return this.repo.save(session);
    }

    async findAll() {
        return this.repo.find({ relations: ['workoutPlan'] });
    }

    async findOne(id: string) {
        return this.repo.findOne({
            where: { id },
            relations: ['workoutPlan'],
        });
    }

    async update(id: string, data: Partial<WorkoutSession>) {
        const session = await this.repo.findOneBy({ id });
        if (!session) return null;

        this.repo.merge(session, data);
        return this.repo.save(session);
    }

    async remove(id: string) {
        const result = await this.repo.delete(id);
        return result.affected !== 0;
    }
}
