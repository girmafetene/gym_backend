import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindManyOptions } from 'typeorm';
import { Attendance } from '../entities/Attendance';
import { Member } from '../entities/Member';
import { ApiResponse } from '../interfaces/response.interface';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>,
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
    ) { }

    async create(attendanceData: Partial<Attendance>): Promise<ApiResponse<Attendance>> {
        try {
            // Check if member exists
            const member = await this.memberRepository.findOne({
                where: { id: attendanceData.member?.id }
            });
            if (!member) {
                return {
                    success: false,
                    message: 'Member not found',
                    statusCode: 404,
                };
            }

            const attendance = this.attendanceRepository.create({
                ...attendanceData,
                member,
            });
            await this.attendanceRepository.save(attendance);
            return {
                success: true,
                data: attendance,
                message: 'Attendance recorded successfully',
                statusCode: 201,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to record attendance',
                statusCode: 400,
            };
        }
    }

    async findAll(
        page: number = 1,
        limit: number = 10,
        memberId?: string,
        startDate?: Date,
        endDate?: Date,
    ): Promise<ApiResponse<{ attendances: Attendance[]; total: number }>> {
        try {
            const skip = (page - 1) * limit;
            const options: FindManyOptions<Attendance> = {
                skip,
                take: limit,
                relations: ['member'],
            };

            if (memberId || startDate || endDate) {
                options.where = {};
                if (memberId) {
                    options.where.member = { id: memberId };
                }
                if (startDate && endDate) {
                    options.where.date = Between(startDate, endDate);
                } else if (startDate) {
                    options.where.date = Between(startDate, new Date());
                }
            }

            const [attendances, total] = await this.attendanceRepository.findAndCount(options);
            return {
                success: true,
                data: { attendances, total },
                message: 'Attendances retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to retrieve attendances',
                statusCode: 500,
            };
        }
    }

    async findOne(id: string): Promise<ApiResponse<Attendance>> {
        try {
            const attendance = await this.attendanceRepository.findOne({
                where: { id },
                relations: ['member'],
            });
            if (!attendance) {
                return {
                    success: false,
                    message: 'Attendance record not found',
                    statusCode: 404,
                };
            }
            return {
                success: true,
                data: attendance,
                message: 'Attendance retrieved successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to retrieve attendance',
                statusCode: 500,
            };
        }
    }

    async update(
        id: string,
        updateData: Partial<Attendance>,
    ): Promise<ApiResponse<Attendance>> {
        try {
            const attendance = await this.attendanceRepository.findOne({
                where: { id },
                relations: ['member'],
            });
            if (!attendance) {
                return {
                    success: false,
                    message: 'Attendance record not found',
                    statusCode: 404,
                };
            }

            // If updating member, verify the new member exists
            if (updateData.member?.id) {
                const member = await this.memberRepository.findOne({
                    where: { id: updateData.member.id }
                });
                if (!member) {
                    return {
                        success: false,
                        message: 'Member not found',
                        statusCode: 404,
                    };
                }
                attendance.member = member;
            }

            if (updateData.date) {
                attendance.date = updateData.date;
            }

            await this.attendanceRepository.save(attendance);
            return {
                success: true,
                data: attendance,
                message: 'Attendance updated successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to update attendance',
                statusCode: 400,
            };
        }
    }

    async remove(id: string): Promise<ApiResponse<void>> {
        try {
            const result = await this.attendanceRepository.delete(id);
            if (result.affected === 0) {
                return {
                    success: false,
                    message: 'Attendance record not found',
                    statusCode: 404,
                };
            }
            return {
                success: true,
                message: 'Attendance deleted successfully',
                statusCode: 204,
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : String(error),
                message: 'Failed to delete attendance',
                statusCode: 500,
            };
        }
    }
}