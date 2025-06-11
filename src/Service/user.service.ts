
import { Equal } from 'typeorm';
import { User } from '../entities/User';
import { ApiResponse } from '../interfaces/response.interface';
import AppDataSource from '../config/data-source';

export class UserService {
    private userRepo = AppDataSource.getRepository(User);

    async getAll(page = 1, limit = 10): Promise<ApiResponse<User[]>> {
        try {
            const [data, total] = await this.userRepo.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                order: { createdAt: 'DESC' },
            });

            return {
                success: true,
                data,
                statusCode: 200,
                message: 'Users fetched successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async getById(id: string): Promise<ApiResponse<User>> {
        try {
            const user = await this.userRepo.findOneBy({ id });
            if (!user) {
                return { success: false, statusCode: 404, message: 'User not found' };
            }

            return { success: true, data: user, statusCode: 200 };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async create(data: Partial<User>): Promise<ApiResponse<User>> {
        try {
            const exists = await this.userRepo.findOneBy({ email: data.email });
            if (exists) {
                return { success: false, statusCode: 409, message: 'Email already in use' };
            }

            const user = this.userRepo.create(data);
            const saved = await this.userRepo.save(user);

            return {
                success: true,
                data: saved,
                statusCode: 201,
                message: 'User created successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async update(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
        try {
            await this.userRepo.update(id, data);
            const updated = await this.userRepo.findOneBy({ id });

            if (!updated) {
                return { success: false, statusCode: 404, message: 'User not found' };
            }

            return {
                success: true,
                data: updated,
                statusCode: 200,
                message: 'User updated successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }

    async delete(id: string): Promise<ApiResponse<null>> {
        try {
            const result = await this.userRepo.delete(id);
            if (result.affected === 0) {
                return { success: false, statusCode: 404, message: 'User not found' };
            }

            return {
                success: true,
                statusCode: 200,
                message: 'User deleted successfully',
            };
        } catch (error) {
            return { success: false, error, statusCode: 500 };
        }
    }
}
