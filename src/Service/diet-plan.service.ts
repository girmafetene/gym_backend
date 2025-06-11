

import AppDataSource from '../config/data-source';
import { DietPlan } from '../entities/DietPlan';

export class DietPlanService {
    private repo = AppDataSource.getRepository(DietPlan);

    async create(data: Partial<DietPlan>) {
        const plan = this.repo.create(data);
        return this.repo.save(plan);
    }

    async findAll() {
        return this.repo.find({
            relations: ['items', 'member', 'trainer'],
        });
    }

    async findOne(id: string) {
        return this.repo.findOne({
            where: { id },
            relations: ['items', 'member', 'trainer'],
        });
    }

    async update(id: string, data: Partial<DietPlan>) {
        const plan = await this.repo.findOne({ where: { id } });
        if (!plan) throw new Error('DietPlan not found');
        this.repo.merge(plan, data);
        return this.repo.save(plan);
    }

    async delete(id: string) {
        const result = await this.repo.delete(id);
        if (!result.affected) throw new Error('DietPlan not found');
        return;
    }
}
