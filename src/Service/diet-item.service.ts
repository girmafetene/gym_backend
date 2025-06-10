import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DietItem } from '../entities/DietItem';
import { DietPlan } from '../entities/DietPlan';
import { ApiResponse } from '../interfaces/response.interface';
 
@Injectable()
export class DietItemService {
    constructor(
        @InjectRepository(DietItem)
        private readonly dietItemRepository: Repository<DietItem>,
        @InjectRepository(DietPlan)
        private readonly dietPlanRepository: Repository<DietPlan>,
    ) { }

    async create(dietItemData: Partial<DietItem>): Promise<ApiResponse<DietItem>> {
        try {
            // Verify diet plan exists
            if (!dietItemData.dietPlan?.id) {
                return {
                    success: false,
                    message: 'Diet plan ID is required',
                    statusCode: 400,
                };
            }

            const dietPlan = await this.dietPlanRepository.findOne({
                where: { id: dietItemData.dietPlan.id },
            });

            if (!dietPlan) {
                return {
                    success: false,
                    message: 'Diet plan not found',
                    statusCode: 404,
                };
            }

            const dietItem = this.dietItemRepository.create({
                ...dietItemData,
                dietPlan,
            });

            await this.dietItemRepository.save(dietItem);
            return {
                success: true,
                data: dietItem,
                message: 'Diet item created successfully',
                statusCode: 201,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to create diet item',
                statusCode: 400,
            };
        }
    }

    async findAllByDietPlan(dietPlanId: string): Promise<ApiResponse<DietItem[]>> {
        try {
            const dietItems = await this.dietItemRepository.find({
                where: { dietPlan: { id: dietPlanId } },
                relations: ['dietPlan'],
            });

            return {
                success: true,
                data: dietItems,
                message: 'Diet items retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to retrieve diet items',
                statusCode: 500,
            };
        }
    }

    async findOne(id: string): Promise<ApiResponse<DietItem>> {
        try {
            const dietItem = await this.dietItemRepository.findOne({
                where: { id },
                relations: ['dietPlan'],
            });

            if (!dietItem) {
                return {
                    success: false,
                    message: 'Diet item not found',
                    statusCode: 404,
                };
            }

            return {
                success: true,
                data: dietItem,
                message: 'Diet item retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to retrieve diet item',
                statusCode: 500,
            };
        }
    }

    async update(
        id: string,
        updateData: Partial<DietItem>,
    ): Promise<ApiResponse<DietItem>> {
        try {
            const dietItem = await this.dietItemRepository.findOne({
                where: { id },
                relations: ['dietPlan'],
            });

            if (!dietItem) {
                return {
                    success: false,
                    message: 'Diet item not found',
                    statusCode: 404,
                };
            }

            // If updating diet plan, verify it exists
            if (updateData.dietPlan?.id) {
                const dietPlan = await this.dietPlanRepository.findOne({
                    where: { id: updateData.dietPlan.id },
                });

                if (!dietPlan) {
                    return {
                        success: false,
                        message: 'Diet plan not found',
                        statusCode: 404,
                    };
                }
                dietItem.dietPlan = dietPlan;
            }

            Object.assign(dietItem, updateData);
            await this.dietItemRepository.save(dietItem);

            return {
                success: true,
                data: dietItem,
                message: 'Diet item updated successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to update diet item',
                statusCode: 400,
            };
        }
    }

    async remove(id: string): Promise<ApiResponse<void>> {
        try {
            const result = await this.dietItemRepository.delete(id);

            if (result.affected === 0) {
                return {
                    success: false,
                    message: 'Diet item not found',
                    statusCode: 404,
                };
            }

            return {
                success: true,
                message: 'Diet item deleted successfully',
                statusCode: 204,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to delete diet item',
                statusCode: 500,
            };
        }
    }
}