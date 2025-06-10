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

import { ApiTags, ApiQuery, ApiResponse as SwaggerApiResponse } from '@nestjs/swagger';
import { AttendanceService } from '../Service/attendance.service';
import { Attendance } from '../entities/Attendance';
import { ApiResponse } from '../interfaces/response.interface';

@ApiTags('attendances')
@Controller('attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) { }

  @Post()
  @SwaggerApiResponse({ status: 201, description: 'Attendance recorded successfully' })
  @SwaggerApiResponse({ status: 400, description: 'Bad Request' })
  @SwaggerApiResponse({ status: 404, description: 'Member not found' })
  async create(@Body() attendanceData: Attendance): Promise<ApiResponse<Attendance>> {
    return this.attendanceService.create(attendanceData);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'memberId', required: false, type: String })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @SwaggerApiResponse({ status: 200, description: 'Attendances retrieved successfully' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('memberId') memberId?: string,
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ): Promise<ApiResponse<{ attendances: Attendance[]; total: number }>> {
    return this.attendanceService.findAll(page, limit, memberId, startDate, endDate);
  }

  @Get(':id')
  @SwaggerApiResponse({ status: 200, description: 'Attendance retrieved successfully' })
  @SwaggerApiResponse({ status: 404, description: 'Attendance not found' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<Attendance>> {
    return this.attendanceService.findOne(id);
  }

  @Put(':id')
  @SwaggerApiResponse({ status: 200, description: 'Attendance updated successfully' })
  @SwaggerApiResponse({ status: 404, description: 'Attendance/Member not found' })
  @SwaggerApiResponse({ status: 400, description: 'Bad Request' })
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Attendance>,
  ): Promise<ApiResponse<Attendance>> {
    return this.attendanceService.update(id, updateData);
  }

  @Delete(':id')
  @SwaggerApiResponse({ status: 204, description: 'Attendance deleted successfully' })
  @SwaggerApiResponse({ status: 404, description: 'Attendance not found' })
  async remove(@Param('id') id: string): Promise<ApiResponse<void>> {
    return this.attendanceService.remove(id);
  }
}