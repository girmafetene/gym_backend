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

import { ApiTags, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { DietItemService } from '../Service/diet-item.service';
import { DietItem } from '../entities/DietItem';
import { ApiResponse } from '../interfaces/response.interface';

@ApiTags('diet-items')
@Controller('diet-items')
export class DietItemController {
    constructor(private readonly dietItemService: DietItemService) { }

    @Post()
    @SwaggerApiResponse({
        status: 201,
        description: 'Diet item created successfully'
    })
    @SwaggerApiResponse({
        status: 400,
        description: 'Bad Request'
    })
    @SwaggerApiResponse({
        status: 404,
        description: 'Diet plan not found'
    })
    async create(
        @Body() dietItemData: DietItem,
    ): Promise<ApiResponse<DietItem>> {
        return this.dietItemService.create(dietItemData);
    }

    @Get('by-plan/:dietPlanId')
    @SwaggerApiResponse({
        status: 200,
        description: 'Diet items retrieved successfully'
    })
    async findAllByDietPlan(
        @Param('dietPlanId') dietPlanId: string,
    ): Promise<ApiResponse<DietItem[]>> {
        return this.dietItemService.findAllByDietPlan(dietPlanId);
    }

    @Get(':id')
    @SwaggerApiResponse({
        status: 200,
        description: 'Diet item retrieved successfully'
    })
    @SwaggerApiResponse({
        status: 404,
        description: 'Diet item not found'
    })
    async findOne(
        @Param('id') id: string,
    ): Promise<ApiResponse<DietItem>> {
        return this.dietItemService.findOne(id);
    }

    @Put(':id')
    @SwaggerApiResponse({
        status: 200,
        description: 'Diet item updated successfully'
    })
    @SwaggerApiResponse({
        status: 404,
        description: 'Diet item/plan not found'
    })
    @SwaggerApiResponse({
        status: 400,
        description: 'Bad Request'
    })
    async update(
        @Param('id') id: string,
        @Body() updateData: Partial<DietItem>,
    ): Promise<ApiResponse<DietItem>> {
        return this.dietItemService.update(id, updateData);
    }

    @Delete(':id')
    @SwaggerApiResponse({
        status: 204,
        description: 'Diet item deleted successfully'
    })
    @SwaggerApiResponse({
        status: 404,
        description: 'Diet item not found'
    })
    async remove(
        @Param('id') id: string,
    ): Promise<ApiResponse<void>> {
        return this.dietItemService.remove(id);
    }
}