import { Request, Response } from 'express';
import { DietPlanService } from '../Service/diet-plan.service';

const service = new DietPlanService();

export const DietPlanController = {
    async create(req: Request, res: Response) {
        try {
            const result = await service.create(req.body);
            res.status(201).json(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            res.status(400).json({ error: errorMessage });
        }
    },

    async getAll(req: Request, res: Response) {
        const result = await service.findAll();
        res.json(result);
    },

    async getById(req: Request, res: Response) {
        try {
            const result = await service.findOne(req.params.id);
            if (!result) return res.status(404).json({ error: 'Not found' });
            res.json(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            res.status(400).json({ error: errorMessage });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const result = await service.update(req.params.id, req.body);
            res.json(result);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            res.status(404).json({ error: errorMessage });
        }
    },

    async delete(req: Request, res: Response) {
        try {
            await service.delete(req.params.id);
            res.status(204).send();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            res.status(404).json({ error: errorMessage });
        }
    },
};
