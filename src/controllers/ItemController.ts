// src/controllers/ItemController.ts
import { Request, Response } from 'express';
import { ItemService } from '../Service/ItemService';
 
export class ItemController {
    static async create(req: Request, res: Response) {
        const fileName = req.file?.filename;
        const result = await ItemService.create(req.body, fileName);
        res.status(result.statusCode!).json(result);
    }

    static async getAll(req: Request, res: Response) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await ItemService.getAll(page, limit);
        res.status(result.statusCode!).json(result);
    }

    static async getById(req: Request, res: Response) {
        const result = await ItemService.getById(req.params.id);
        res.status(result.statusCode!).json(result);
    }

    static async update(req: Request, res: Response) {
        const fileName = req.file?.filename;
        const result = await ItemService.update(req.params.id, req.body, fileName);
        res.status(result.statusCode!).json(result);
    }

    static async delete(req: Request, res: Response) {
        const result = await ItemService.delete(req.params.id);
        res.status(result.statusCode!).json(result);
    }
}
