import { AppDataSource } from "../config/data-source";
import { MembershipPlan } from "../entities/MembershipPlan";
import { ApiResponse } from "../interfaces/response.interface";


export class MembershipPlanService {
    private planRepo = AppDataSource.getRepository(MembershipPlan);

    async getAll(page = 1, limit = 10): Promise<ApiResponse<MembershipPlan[]>> {
        try {
            const [data, total] = await this.planRepo.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
            });

            return {
                success: true,
                data,
                statusCode: 200,
                message: 'Membership plans fetched successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async getById(id: string): Promise<ApiResponse<MembershipPlan>> {
        try {
            const plan = await this.planRepo.findOneBy({ id });
            if (!plan) {
                return { success: false, statusCode: 404, message: 'Plan not found' };
            }
            return { success: true, data: plan, statusCode: 200 };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async create(data: Partial<MembershipPlan>): Promise<ApiResponse<MembershipPlan>> {
        try {
            const plan = this.planRepo.create(data);
            const saved = await this.planRepo.save(plan);
            return {
                success: true,
                data: saved,
                statusCode: 201,
                message: 'Membership plan created successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async update(id: string, data: Partial<MembershipPlan>): Promise<ApiResponse<MembershipPlan>> {
        try {
            await this.planRepo.update(id, data);
            const updated = await this.planRepo.findOneBy({ id });

            if (!updated) {
                return { success: false, statusCode: 404, message: 'Plan not found' };
            }

            return {
                success: true,
                data: updated,
                statusCode: 200,
                message: 'Plan updated successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async delete(id: string): Promise<ApiResponse<null>> {
        try {
            const result = await this.planRepo.delete(id);
            if (result.affected === 0) {
                return { success: false, statusCode: 404, message: 'Plan not found' };
            }
            return { success: true, statusCode: 200, message: 'Plan deleted successfully' };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }
}
