import { Request, Response } from 'express';
import { ScheduleService } from '../Service/schedule.service';


const service = new ScheduleService();

export class ScheduleController {
    static async getAll(req: Request, res: Response) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const result = await service.getAll(page, limit);
        res.status(result.statusCode || 500).json(result);
    }

    static async getById(req: Request, res: Response) {
        const result = await service.getById(req.params.id);
        res.status(result.statusCode || 500).json(result);
    }

    static async create(req: Request, res: Response) {
        const result = await service.create(req.body);
        res.status(result.statusCode || 500).json(result);
    }

    static async update(req: Request, res: Response) {
        const result = await service.update(req.params.id, req.body);
        res.status(result.statusCode || 500).json(result);
    }

    static async delete(req: Request, res: Response) {
        const result = await service.delete(req.params.id);
        res.status(result.statusCode || 500).json(result);
    }
}
