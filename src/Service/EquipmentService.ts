// src/services/EquipmentService.ts


import { Equipment } from '../entities/Equipment';
import { ApiResponse } from '../interfaces/response.interface';

export class EquipmentService {
    static async create(data: Partial<Equipment>, fileName?: string): Promise<ApiResponse<Equipment>> {
        try {
            const equipment = new Equipment();
            Object.assign(equipment, data);
            if (fileName) equipment.imagePath = `/uploads/equipment/${fileName}`;
            await equipment.save();
            // const equipment = Equipment.create({
            //     ...data,
            //     imagePath: fileName ? `/uploads/equipment/${fileName}` : "",
            //     //imagePath: fileName ? `/uploads/equipment/${fileName}` : undefined,
            // }) as unknown as Equipment;
            // await equipment.save();
            return { success: true, message: 'Equipment created', data: equipment as any, statusCode: 201 };
        } catch (error) {
            return { success: false, message: 'Create failed', error, statusCode: 500 };
        }
    }

    static async getAll(page = 1, limit = 10): Promise<ApiResponse<any>> {
        try {
            const [items, total] = await Equipment.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                order: { createdAt: 'DESC' },
            });
            return {
                success: true,
                data: { items, total, page, limit },
                statusCode: 200,
            };
        } catch (error) {
            return { success: false, message: 'Fetch failed', error, statusCode: 500 };
        }
    }

    static async getById(id: string): Promise<ApiResponse<Equipment>> {
        try {
            const equipment = await Equipment.findOne({ where: { id } });
            if (!equipment) {
                return { success: false, message: 'Not found', statusCode: 404 };
            }
            return { success: true, data: equipment, statusCode: 200 };
        } catch (error) {
            return { success: false, message: 'Fetch error', error, statusCode: 500 };
        }
    }

    static async update(id: string, data: Partial<Equipment>, fileName?: string): Promise<ApiResponse<Equipment>> {
        try {
            const equipment = await Equipment.findOne({ where: { id } });
            if (!equipment) return { success: false, message: 'Not found', statusCode: 404 };

            Object.assign(equipment, data);
            if (fileName) equipment.imagePath = `/uploads/equipment/${fileName}`;

            await equipment.save();
            return { success: true, message: 'Updated', data: equipment, statusCode: 200 };
        } catch (error) {
            return { success: false, message: 'Update error', error, statusCode: 500 };
        }
    }

    static async delete(id: string): Promise<ApiResponse<any>> {
        try {
            const equipment = await Equipment.findOne({ where: { id } });
            if (!equipment) return { success: false, message: 'Not found', statusCode: 404 };
            await equipment.remove();
            return { success: true, message: 'Deleted', statusCode: 200 };
        } catch (error) {
            return { success: false, message: 'Delete error', error, statusCode: 500 };
        }
    }
}
