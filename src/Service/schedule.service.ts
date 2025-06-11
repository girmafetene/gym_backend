
import AppDataSource from "../config/data-source";
import { Schedule } from "../entities/Schedule";
import { ApiResponse } from "../interfaces/response.interface";


export class ScheduleService {
    private scheduleRepo = AppDataSource.getRepository(Schedule);

    async getAll(page = 1, limit = 10): Promise<ApiResponse<Schedule[]>> {
        try {
            const [data, total] = await this.scheduleRepo.findAndCount({
                relations: ['trainer'],
                skip: (page - 1) * limit,
                take: limit,
                order: { day: 'ASC' }
            });

            return {
                success: true,
                data,
                statusCode: 200,
                message: 'Schedules fetched successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async getById(id: string): Promise<ApiResponse<Schedule>> {
        try {
            const schedule = await this.scheduleRepo.findOne({
                where: { id },
                relations: ['trainer'],
            });

            if (!schedule) {
                return { success: false, statusCode: 404, message: 'Schedule not found' };
            }

            return { success: true, data: schedule, statusCode: 200 };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async create(data: Partial<Schedule>): Promise<ApiResponse<Schedule>> {
        try {
            const schedule = this.scheduleRepo.create(data);
            const saved = await this.scheduleRepo.save(schedule);

            return {
                success: true,
                data: saved,
                statusCode: 201,
                message: 'Schedule created successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async update(id: string, data: Partial<Schedule>): Promise<ApiResponse<Schedule>> {
        try {
            await this.scheduleRepo.update(id, data);
            const updated = await this.scheduleRepo.findOne({
                where: { id },
                relations: ['trainer'],
            });

            if (!updated) {
                return { success: false, statusCode: 404, message: 'Schedule not found' };
            }

            return {
                success: true,
                data: updated,
                statusCode: 200,
                message: 'Schedule updated successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async delete(id: string): Promise<ApiResponse<null>> {
        try {
            const result = await this.scheduleRepo.delete(id);
            if (result.affected === 0) {
                return { success: false, statusCode: 404, message: 'Schedule not found' };
            }

            return {
                success: true,
                statusCode: 200,
                message: 'Schedule deleted successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }
}
