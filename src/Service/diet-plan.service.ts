import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DietPlan } from '../entities/DietPlan';
import { Member } from '../entities/Member';
import { Trainer } from '../entities/Trainer';
import { DietItem } from '../entities/DietItem';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable()
export class DietPlanService {
    constructor(
        @InjectRepository(DietPlan)
        private readonly dietPlanRepository: Repository<DietPlan>,
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
        @InjectRepository(Trainer)
        private readonly trainerRepository: Repository<Trainer>,
        @InjectRepository(DietItem)
        private readonly dietItemRepository: Repository<DietItem>,
    ) { }

    async create(dietPlanData: Partial<DietPlan>): Promise<ApiResponse<DietPlan>> {
        try {
            // Verify member and trainer exist
            const member = await this.memberRepository.findOne({
                where: { id: dietPlanData.member?.id },
            });
            if (!member) {
                return {
                    success: false,
                    message: 'Member not found',
                    statusCode: 404,
                };
            }

            const trainer = await this.trainerRepository.findOne({
                where: { id: dietPlanData.trainer?.id },
            });
            if (!trainer) {
                return {
                    success: false,
                    message: 'Trainer not found',
                    statusCode: 404,
                };
            }

            const dietPlan = this.dietPlanRepository.create({
                ...dietPlanData,
                member,
                trainer,
            });

            // Handle diet items if provided
            if (dietPlanData.items && dietPlanData.items.length > 0) {
                dietPlan.items = await Promise.all(
                    dietPlanData.items.map(async (item) => {
                        const newItem = this.dietItemRepository.create(item);
                        return await this.dietItemRepository.save(newItem);
                    }),
                );
            }

            await this.dietPlanRepository.save(dietPlan);
            return {
                success: true,
                data: dietPlan,
                message: 'Diet plan created successfully',
                statusCode: 201,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to create diet plan',
                statusCode: 400,
            };
        }
    }

    async findAll(): Promise<ApiResponse<DietPlan[]>> {
        try {
            const dietPlans = await this.dietPlanRepository.find({
                relations: ['member', 'trainer', 'items'],
            });
            return {
                success: true,
                data: dietPlans,
                message: 'Diet plans retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to retrieve diet plans',
                statusCode: 500,
            };
        }
    }

    async findByMember(memberId: string): Promise<ApiResponse<DietPlan[]>> {
        try {
            const dietPlans = await this.dietPlanRepository.find({
                where: { member: { id: memberId } },
                relations: ['trainer', 'items'],
            });
            return {
                success: true,
                data: dietPlans,
                message: 'Diet plans retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to retrieve diet plans',
                statusCode: 500,
            };
        }
    }

    async findByTrainer(trainerId: string): Promise<ApiResponse<DietPlan[]>> {
        try {
            const dietPlans = await this.dietPlanRepository.find({
                where: { trainer: { id: trainerId } },
                relations: ['member', 'items'],
            });
            return {
                success: true,
                data: dietPlans,
                message: 'Diet plans retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to retrieve diet plans',
                statusCode: 500,
            };
        }
    }

    async findOne(id: string): Promise<ApiResponse<DietPlan>> {
        try {
            const dietPlan = await this.dietPlanRepository.findOne({
                where: { id },
                relations: ['member', 'trainer', 'items'],
            });
            if (!dietPlan) {
                return {
                    success: false,
                    message: 'Diet plan not found',
                    statusCode: 404,
                };
            }
            return {
                success: true,
                data: dietPlan,
                message: 'Diet plan retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to retrieve diet plan',
                statusCode: 500,
            };
        }
    }

    async update(
        id: string,
        updateData: Partial<DietPlan>,
    ): Promise<ApiResponse<DietPlan>> {
        try {
            const dietPlan = await this.dietPlanRepository.findOne({
                where: { id },
                relations: ['member', 'trainer', 'items'],
            });
            if (!dietPlan) {
                return {
                    success: false,
                    message: 'Diet plan not found',
                    statusCode: 404,
                };
            }

            // Update member if provided
            if (updateData.member?.id) {
                const member = await this.memberRepository.findOne({
                    where: { id: updateData.member.id },
                });
                if (!member) {
                    return {
                        success: false,
                        message: 'Member not found',
                        statusCode: 404,
                    };
                }
                dietPlan.member = member;
            }

            // Update trainer if provided
            if (updateData.trainer?.id) {
                const trainer = await this.trainerRepository.findOne({
                    where: { id: updateData.trainer.id },
                });
                if (!trainer) {
                    return {
                        success: false,
                        message: 'Trainer not found',
                        statusCode: 404,
                    };
                }
                dietPlan.trainer = trainer;
            }

            // Update basic fields
            if (updateData.title) {
                dietPlan.title = updateData.title;
            }

            // Handle diet items updates
            if (updateData.items) {
                // Remove existing items not in the update
                await this.dietItemRepository.delete({
                    dietPlan: { id: dietPlan.id },
                });

                // Add new items
                dietPlan.items = await Promise.all(
                    updateData.items.map(async (item) => {
                        const newItem = this.dietItemRepository.create({
                            ...item,
                            dietPlan,
                        });
                        return await this.dietItemRepository.save(newItem);
                    }),
                );
            }

            await this.dietPlanRepository.save(dietPlan);
            return {
                success: true,
                data: dietPlan,
                message: 'Diet plan updated successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to update diet plan',
                statusCode: 400,
            };
        }
    }

    async remove(id: string): Promise<ApiResponse<void>> {
        try {
            // Cascade delete will handle the items
            const result = await this.dietPlanRepository.delete(id);
            if (result.affected === 0) {
                return {
                    success: false,
                    message: 'Diet plan not found',
                    statusCode: 404,
                };
            }
            return {
                success: true,
                message: 'Diet plan deleted successfully',
                statusCode: 204,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to delete diet plan',
                statusCode: 500,
            };
        }
    }
}