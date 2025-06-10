import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
} from '@nestjs/common';

import { ApiTags, ApiResponse as SwaggerApiResponse, ApiQuery } from '@nestjs/swagger';
import { DietPlanService } from '../Service/diet-plan.service';
import { DietPlan } from '../entities/DietPlan';
import { ApiResponse } from '../interfaces/response.interface';

@ApiTags('diet-plans')
@Controller('diet-plans')
export class DietPlanController {
    constructor(private readonly dietPlanService: DietPlanService) { }

    @Post()
    @SwaggerApiResponse({
        status: 201,
        description: 'Diet plan created successfully',
    })
    @SwaggerApiResponse({
        status: 400,
        description: 'Bad Request',
    })
    @SwaggerApiResponse({
        status: 404,
        description: 'Member/Trainer not found',
    })
    async create(
        @Body() dietPlanData: DietPlan,
    ): Promise<ApiResponse<DietPlan>> {
        return this.dietPlanService.create(dietPlanData);
    }

    @Get()
    @SwaggerApiResponse({
        status: 200,
        description: 'Diet plans retrieved successfully',
    })
    async findAll(): Promise<ApiResponse<DietPlan[]>> {
        return this.dietPlanService.findAll();
    }

    @Get('by-member/:memberId')
    @SwaggerApiResponse({
        status: 200,
        description: 'Diet plans retrieved successfully',
    })
    async findByMember(
        @Param('memberId') memberId: string,
    ): Promise<ApiResponse<DietPlan[]>> {
        return this.dietPlanService.findByMember(memberId);
    }

    @Get('by-trainer/:trainerId')
    @SwaggerApiResponse({
        status: 200,
        description: 'Diet plans retrieved successfully',
    })
    async findByTrainer(
        @Param('trainerId') trainerId: string,
    ): Promise<ApiResponse<DietPlan[]>> {
        return this.dietPlanService.findByTrainer(trainerId);
    }

    @Get(':id')
    @SwaggerApiResponse({
        status: 200,
        description: 'Diet plan retrieved successfully',
    })
    @SwaggerApiResponse({
        status: 404,
        description: 'Diet plan not found',
    })
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<DietPlan>> {
        return this.dietPlanService.findOne(id);
    }

    @Put(':id')
    @SwaggerApiResponse({
        status: 200,
        description: 'Diet plan updated successfully',
    })
    @SwaggerApiResponse({
        status: 404,
        description: 'Diet plan/Member/Trainer not found',
    })
    @SwaggerApiResponse({
        status: 400,
        description: 'Bad Request',
    })
    async update(
        @Param('id') id: string,
        @Body() updateData: Partial<DietPlan>,
    ): Promise<ApiResponse<DietPlan>> {
        return this.dietPlanService.update(id, updateData);
    }

    @Delete(':id')
    @SwaggerApiResponse({
        status: 204,
        description: 'Diet plan deleted successfully',
    })
    @SwaggerApiResponse({
        status: 404,
        description: 'Diet plan not found',
    })
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<void>> {
        return this.dietPlanService.remove(id);
    }
}