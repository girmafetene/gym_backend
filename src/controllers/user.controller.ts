import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    HttpStatus,
} from '@nestjs/common';

import { ApiTags, ApiQuery, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { UserService } from '../Service/user.service';
import { ApiResponse } from '../interfaces/response.interface';
import { User, UserRole } from '../entities/User';

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @SwaggerApiResponse({ status: 201, description: 'User created successfully' })
    @SwaggerApiResponse({ status: 400, description: 'Bad Request' })
    async create(@Body() userData: User): Promise<ApiResponse<User>> {
        return this.userService.create(userData);
    }

    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'role', required: false, enum: UserRole })
    @SwaggerApiResponse({ status: 200, description: 'Users retrieved successfully' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('search') search?: string,
        @Query('role') role?: UserRole,
    ): Promise<ApiResponse<{ users: User[]; total: number }>> {
        return this.userService.findAll(page, limit, search, role);
    }

    @Get(':id')
    @SwaggerApiResponse({ status: 200, description: 'User retrieved successfully' })
    @SwaggerApiResponse({ status: 404, description: 'User not found' })
    async findOne(@Param('id') id: string): Promise<ApiResponse<User>> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    @SwaggerApiResponse({ status: 200, description: 'User updated successfully' })
    @SwaggerApiResponse({ status: 404, description: 'User not found' })
    @SwaggerApiResponse({ status: 400, description: 'Bad Request' })
    async update(
        @Param('id') id: string,
        @Body() updateData: Partial<User>,
    ): Promise<ApiResponse<User>> {
        return this.userService.update(id, updateData);
    }

    @Delete(':id')
    @SwaggerApiResponse({ status: 204, description: 'User deleted successfully' })
    @SwaggerApiResponse({ status: 404, description: 'User not found' })
    async remove(@Param('id') id: string): Promise<ApiResponse<void>> {
        return this.userService.remove(id);
    }
}