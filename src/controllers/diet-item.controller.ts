import { Request, Response } from 'express';
import { DietItemService } from '../Service/diet-item.service';

const service = new DietItemService();

export class DietItemController {
    static async create(req: Request, res: Response) {
        const result = await service.create(req.body);
        res.status(201).json(result);
    }

    static async getAll(req: Request, res: Response) {
        const result = await service.findAll();
        res.json(result);
    }

    static async getById(req: Request, res: Response) {
        const result = await service.findOne(req.params.id);
        if (!result) return res.status(404).json({ message: 'Not found' });
        res.json(result);
    }

    static async update(req: Request, res: Response) {
        const result = await service.update(req.params.id, req.body);
        res.json(result);
    }

    static async delete(req: Request, res: Response) {
        await service.remove(req.params.id);
        res.status(204).send();
    }
}
