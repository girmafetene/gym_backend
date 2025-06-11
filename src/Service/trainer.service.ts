
import AppDataSource from "../config/data-source";
import { Trainer } from "../entities/Trainer";
import { ApiResponse } from "../interfaces/response.interface";


export class TrainerService {
    private trainerRepo = AppDataSource.getRepository(Trainer);

    async getAll(page = 1, limit = 10): Promise<ApiResponse<Trainer[]>> {
        try {
            const [data, total] = await this.trainerRepo.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                relations: ['workoutPlans', 'dietPlans', 'schedules'],
                order: { createdAt: 'DESC' }, // if `User` has `createdAt`
            });

            return {
                success: true,
                data,
                statusCode: 200,
                message: 'Trainers fetched successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async getById(id: string): Promise<ApiResponse<Trainer>> {
        try {
            const trainer = await this.trainerRepo.findOne({
                where: { id },
                relations: ['workoutPlans', 'dietPlans', 'schedules'],
            });

            if (!trainer) {
                return { success: false, statusCode: 404, message: 'Trainer not found' };
            }

            return { success: true, data: trainer, statusCode: 200 };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async create(data: Partial<Trainer>): Promise<ApiResponse<Trainer>> {
        try {
            const trainer = this.trainerRepo.create(data);
            const saved = await this.trainerRepo.save(trainer);

            return {
                success: true,
                data: saved,
                statusCode: 201,
                message: 'Trainer created successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async update(id: string, data: Partial<Trainer>): Promise<ApiResponse<Trainer>> {
        try {
            await this.trainerRepo.update(id, data);
            const updated = await this.trainerRepo.findOne({
                where: { id },
                relations: ['workoutPlans', 'dietPlans', 'schedules'],
            });

            if (!updated) {
                return { success: false, statusCode: 404, message: 'Trainer not found' };
            }

            return {
                success: true,
                data: updated,
                statusCode: 200,
                message: 'Trainer updated successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async delete(id: string): Promise<ApiResponse<null>> {
        try {
            const result = await this.trainerRepo.delete(id);
            if (result.affected === 0) {
                return { success: false, statusCode: 404, message: 'Trainer not found' };
            }

            return {
                success: true,
                statusCode: 200,
                message: 'Trainer deleted successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }
}
