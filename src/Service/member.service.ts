
import { FindManyOptions } from 'typeorm';
import { Member } from '../entities/Member';
import { ApiResponse } from '../interfaces/response.interface';
import AppDataSource from '../config/data-source';

export class MemberService {
    private memberRepo = AppDataSource.getRepository(Member);

    async getAll(page = 1, limit = 10): Promise<ApiResponse<Member[]>> {
        try {
            const [data, total] = await this.memberRepo.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                relations: ['subscriptions', 'attendances', 'workoutPlans', 'dietPlans'],
            });

            return {
                success: true,
                data,
                statusCode: 200,
                message: 'Members fetched successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async getById(id: number): Promise<ApiResponse<Member>> {
        try {
            const member = await this.memberRepo.findOne({
                where: { id: id.toString() },
                relations: ['subscriptions', 'attendances', 'workoutPlans', 'dietPlans'],
            });

            if (!member) return { success: false, message: 'Member not found', statusCode: 404 };

            return {
                success: true,
                data: member,
                statusCode: 200,
                message: 'Member fetched successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async create(data: Partial<Member>): Promise<ApiResponse<Member>> {
        try {
            const member = this.memberRepo.create(data);
            const saved = await this.memberRepo.save(member);

            return {
                success: true,
                data: saved,
                statusCode: 201,
                message: 'Member created successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async update(id: number, data: Partial<Member>): Promise<ApiResponse<Member>> {
        try {
            await this.memberRepo.update(id, data);
            const updated = await this.memberRepo.findOneBy({ id: id.toString() });

            if (!updated) return { success: false, message: 'Member not found', statusCode: 404 };

            return {
                success: true,
                data: updated,
                statusCode: 200,
                message: 'Member updated successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async delete(id: number): Promise<ApiResponse<null>> {
        try {
            const result = await this.memberRepo.delete(id);
            if (result.affected === 0) {
                return { success: false, message: 'Member not found', statusCode: 404 };
            }

            return { success: true, message: 'Member deleted successfully', statusCode: 200 };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }
}
