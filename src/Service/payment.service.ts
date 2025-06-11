
import AppDataSource from "../config/data-source";
import { Payment } from "../entities/Payment";
import { ApiResponse } from "../interfaces/response.interface";


export class PaymentService {
    private paymentRepo = AppDataSource.getRepository(Payment);

    async getAll(page = 1, limit = 10): Promise<ApiResponse<Payment[]>> {
        try {
            const [data, total] = await this.paymentRepo.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                order: { date: 'DESC' },
            });

            return {
                success: true,
                data,
                statusCode: 200,
                message: 'Payments fetched successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async getById(id: string): Promise<ApiResponse<Payment>> {
        try {
            const payment = await this.paymentRepo.findOneBy({ id });
            if (!payment) {
                return { success: false, statusCode: 404, message: 'Payment not found' };
            }

            return { success: true, data: payment, statusCode: 200 };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async create(data: Partial<Payment>): Promise<ApiResponse<Payment>> {
        try {
            const payment = this.paymentRepo.create(data);
            const saved = await this.paymentRepo.save(payment);

            return {
                success: true,
                data: saved,
                statusCode: 201,
                message: 'Payment created successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async update(id: string, data: Partial<Payment>): Promise<ApiResponse<Payment>> {
        try {
            await this.paymentRepo.update(id, data);
            const updated = await this.paymentRepo.findOneBy({ id });

            if (!updated) {
                return { success: false, statusCode: 404, message: 'Payment not found' };
            }

            return {
                success: true,
                data: updated,
                statusCode: 200,
                message: 'Payment updated successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async delete(id: string): Promise<ApiResponse<null>> {
        try {
            const result = await this.paymentRepo.delete(id);
            if (result.affected === 0) {
                return { success: false, statusCode: 404, message: 'Payment not found' };
            }

            return {
                success: true,
                statusCode: 200,
                message: 'Payment deleted successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }
}
