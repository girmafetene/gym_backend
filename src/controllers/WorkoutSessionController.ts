// src/controllers/WorkoutSessionController.ts
import { Request, Response } from 'express';
import { WorkoutSessionService } from '../Service/WorkoutSessionService';

const service = new WorkoutSessionService();

export class WorkoutSessionController {
    static async create(req: Request, res: Response) {
        try {
            const result = await service.create(req.body);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const sessions = await service.findAll();
            res.json({ success: true, data: sessions });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    }

    static async findOne(req: Request, res: Response) {
        try {
            const session = await service.findOne(req.params.id);
            if (!session) return res.status(404).json({ success: false, message: 'Not found' });

            res.json({ success: true, data: session });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const updated = await service.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ success: false, message: 'Not found' });

            res.json({ success: true, data: updated });
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const deleted = await service.remove(req.params.id);
            if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });

            res.json({ success: true, message: 'Deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    }
}
