
import AppDataSource from "../config/data-source";
import { Subscription } from "../entities/Subscription";
import { ApiResponse } from "../interfaces/response.interface";



export class SubscriptionService {
    private subscriptionRepo = AppDataSource.getRepository(Subscription);

    async getAll(page = 1, limit = 10): Promise<ApiResponse<Subscription[]>> {
        try {
            const [data, total] = await this.subscriptionRepo.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                relations: ['member', 'plan', 'payment'],
                order: { startDate: 'DESC' },
            });

            return {
                success: true,
                data,
                statusCode: 200,
                message: 'Subscriptions fetched successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async getById(id: string): Promise<ApiResponse<Subscription>> {
        try {
            const subscription = await this.subscriptionRepo.findOne({
                where: { id },
                relations: ['member', 'plan', 'payment'],
            });

            if (!subscription) {
                return { success: false, statusCode: 404, message: 'Subscription not found' };
            }

            return { success: true, data: subscription, statusCode: 200 };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async create(data: Partial<Subscription>): Promise<ApiResponse<Subscription>> {
        try {
            const subscription = this.subscriptionRepo.create(data);
            const saved = await this.subscriptionRepo.save(subscription);

            return {
                success: true,
                data: saved,
                statusCode: 201,
                message: 'Subscription created successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async update(id: string, data: Partial<Subscription>): Promise<ApiResponse<Subscription>> {
        try {
            await this.subscriptionRepo.update(id, data);
            const updated = await this.subscriptionRepo.findOne({
                where: { id },
                relations: ['member', 'plan', 'payment'],
            });

            if (!updated) {
                return { success: false, statusCode: 404, message: 'Subscription not found' };
            }

            return {
                success: true,
                data: updated,
                statusCode: 200,
                message: 'Subscription updated successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async delete(id: string): Promise<ApiResponse<null>> {
        try {
            const result = await this.subscriptionRepo.delete(id);
            if (result.affected === 0) {
                return { success: false, statusCode: 404, message: 'Subscription not found' };
            }

            return {
                success: true,
                statusCode: 200,
                message: 'Subscription deleted successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }
}
