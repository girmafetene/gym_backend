// src/services/workout-plan.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkoutPlan } from '../entities/WorkoutPlan';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable()
export class WorkoutPlanService {
    constructor(
        @InjectRepository(WorkoutPlan)
        private readonly workoutPlanRepo: Repository<WorkoutPlan>,
    ) { }

    async create(data: Partial<WorkoutPlan>): Promise<ApiResponse<WorkoutPlan>> {
        const created = this.workoutPlanRepo.create(data);
        const saved = await this.workoutPlanRepo.save(created);
        return { success: true, message: 'Workout plan created', data: saved };
    }

    async findAll(page = 1, limit = 10): Promise<ApiResponse<{ data: WorkoutPlan[]; total: number }>> {
        const [data, total] = await this.workoutPlanRepo.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            relations: ['member', 'trainer', 'sessions'],
        });
        return { success: true, data: { data, total } };
    }

    async findOne(id: string): Promise<ApiResponse<WorkoutPlan>> {
        const plan = await this.workoutPlanRepo.findOne({
            where: { id },
            relations: ['member', 'trainer', 'sessions'],
        });
        if (!plan) throw new NotFoundException('Workout plan not found');
        return { success: true, data: plan };
    }

    async update(id: string, data: Partial<WorkoutPlan>): Promise<ApiResponse<WorkoutPlan>> {
        await this.workoutPlanRepo.update(id, data);
        const updated = await this.workoutPlanRepo.findOne({ where: { id } });
        if (!updated) throw new NotFoundException('Workout plan not found');
        return { success: true, message: 'Workout plan updated', data: updated };
    }

    async remove(id: string): Promise<ApiResponse<void>> {
        const found = await this.workoutPlanRepo.findOne({ where: { id } });
        if (!found) throw new NotFoundException('Workout plan not found');
        await this.workoutPlanRepo.delete(id);
        return { success: true, message: 'Workout plan deleted' };
    }
}
