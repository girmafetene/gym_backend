// src/services/ItemService.ts

import { Item } from "../entities/Item";
import { ApiResponse } from "../interfaces/response.interface";


export class ItemService {
    static async create(data: Partial<Item>, fileName?: string): Promise<ApiResponse<Item>> {
        try {
            const item = Item.create({
                ...data

            }) as Item;
            await item.save();
            return { success: true, message: 'Item created successfully', data: item, statusCode: 201 };
        } catch (error) {
            return { success: false, message: 'Failed to create item', error, statusCode: 500 };
        }
    }

    static async getAll(page = 1, limit = 10): Promise<ApiResponse<{ items: Item[]; total: number; page: number; limit: number }>> {
        try {
            const [items, total] = await Item.findAndCount({
                skip: (page - 1) * limit,
                take: limit,
                order: { createdAt: 'DESC' },
            });
            return { success: true, data: { items, total, page, limit }, statusCode: 200 };
        } catch (error) {
            return { success: false, message: 'Failed to fetch items', error, statusCode: 500 };
        }
    }

    static async getById(id: string): Promise<ApiResponse<Item>> {
        try {
            const item = await Item.findOneBy({ id });
            if (!item) return { success: false, message: 'Item not found', statusCode: 404 };
            return { success: true, data: item, statusCode: 200 };
        } catch (error) {
            return { success: false, message: 'Error fetching item', error, statusCode: 500 };
        }
    }

    static async update(id: string, data: Partial<Item>, fileName?: string): Promise<ApiResponse<Item>> {
        try {
            const item = await Item.findOneBy({ id });
            if (!item) return { success: false, message: 'Item not found', statusCode: 404 };
            Object.assign(item, data);
            await item.save();
            return { success: true, message: 'Item updated', data: item, statusCode: 200 };
        } catch (error) {
            return { success: false, message: 'Failed to update item', error, statusCode: 500 };
        }
    }

    static async delete(id: string): Promise<ApiResponse<null>> {
        try {
            const item = await Item.findOneBy({ id });
            if (!item) return { success: false, message: 'Item not found', statusCode: 404 };

            await item.remove();
            return { success: true, message: 'Item deleted', statusCode: 200 };
        } catch (error) {
            return { success: false, message: 'Failed to delete item', error, statusCode: 500 };
        }
    }
}
