// services/attendance.service.ts


import AppDataSource from '../config/data-source';
import { Attendance } from '../entities/Attendance';

const attendanceRepo = AppDataSource.getRepository(Attendance);

export const AttendanceService = {
    async getAll(): Promise<Attendance[]> {
        return attendanceRepo.find();
    },

    async getById(id: string): Promise<Attendance | null> {
        return attendanceRepo.findOne({ where: { id } });
    },

    async create(data: Partial<Attendance>): Promise<Attendance> {
        const attendance = attendanceRepo.create(data);
        return attendanceRepo.save(attendance);
    },

    async update(id: string, data: Partial<Attendance>): Promise<Attendance | null> {
        const existing = await attendanceRepo.findOne({ where: { id } });
        if (!existing) return null;

        attendanceRepo.merge(existing, data);
        return attendanceRepo.save(existing);
    },

    async remove(id: string): Promise<boolean> {
        const result = await attendanceRepo.delete(id);
        return result.affected !== 0;
    },
};
