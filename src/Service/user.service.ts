import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, FindManyOptions } from 'typeorm';
import { User, UserRole } from '../entities/User';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(userData: Partial<User>): Promise<ApiResponse<User>> {
        try {
            const user = this.userRepository.create(userData);
            await this.userRepository.save(user);
            return {
                success: true,
                data: user,
                message: 'User created successfully',
                statusCode: 201,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to create user',
                statusCode: 400,
            };
        }
    }

    async findAll(
        page: number = 1,
        limit: number = 10,
        search?: string,
        role?: UserRole,
    ): Promise<ApiResponse<{ users: User[]; total: number }>> {
        try {
            const skip = (page - 1) * limit;
            const options: FindManyOptions<User> = {
                skip,
                take: limit,
            };

            if (search || role) {
                options.where = {};
                if (search) {
                    options.where.fullName = Like(`%${search}%`);
                }
                if (role) {
                    options.where.role = role;
                }
            }

            const [users, total] = await this.userRepository.findAndCount(options);
            return {
                success: true,
                data: { users, total },
                message: 'Users retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to retrieve users',
                statusCode: 500,
            };
        }
    }

    async findOne(id: string): Promise<ApiResponse<User>> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                return {
                    success: false,
                    message: 'User not found',
                    statusCode: 404,
                };
            }
            return {
                success: true,
                data: user,
                message: 'User retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to retrieve user',
                statusCode: 500,
            };
        }
    }

    async update(
        id: string,
        updateData: Partial<User>,
    ): Promise<ApiResponse<User>> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                return {
                    success: false,
                    message: 'User not found',
                    statusCode: 404,
                };
            }

            Object.assign(user, updateData);
            await this.userRepository.save(user);
            return {
                success: true,
                data: user,
                message: 'User updated successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to update user',
                statusCode: 400,
            };
        }
    }

    async remove(id: string): Promise<ApiResponse<void>> {
        try {
            const result = await this.userRepository.delete(id);
            if (result.affected === 0) {
                return {
                    success: false,
                    message: 'User not found',
                    statusCode: 404,
                };
            }
            return {
                success: true,
                message: 'User deleted successfully',
                statusCode: 204,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to delete user',
                statusCode: 500,
            };
        }
    }
}