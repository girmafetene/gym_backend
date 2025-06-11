// src/controllers/EquipmentController.ts
import { Request, Response } from 'express';
import { EquipmentService } from '../Service/EquipmentService';



export class EquipmentController {
    static async create(req: Request, res: Response) {
        const fileName = req.file?.filename;
        const result = await EquipmentService.create(req.body, fileName);
        res.status(result.statusCode!).json(result);
    }

    static async getAll(req: Request, res: Response) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await EquipmentService.getAll(page, limit);
        res.status(result.statusCode!).json(result);
    }

    static async getById(req: Request, res: Response) {
        const result = await EquipmentService.getById(req.params.id);
        res.status(result.statusCode!).json(result);
    }

    static async update(req: Request, res: Response) {
        const fileName = req.file?.filename;
        const result = await EquipmentService.update(req.params.id, req.body, fileName);
        res.status(result.statusCode!).json(result);
    }

    static async delete(req: Request, res: Response) {
        const result = await EquipmentService.delete(req.params.id);
        res.status(result.statusCode!).json(result);
    }
}
