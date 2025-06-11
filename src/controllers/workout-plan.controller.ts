import { Request, Response } from 'express';
import { WorkoutPlan } from '../entities/WorkoutPlan';
import AppDataSource from '../config/data-source';

const workoutPlanRepo = AppDataSource.getRepository(WorkoutPlan);

export class WorkoutPlanController {
    static async create(req: Request, res: Response) {
        try {
            const workoutPlan = workoutPlanRepo.create(req.body);
            const result = await workoutPlanRepo.save(workoutPlan);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }

    static async findAll(req: Request, res: Response) {
        try {
            const plans = await workoutPlanRepo.find({
                relations: ['member', 'trainer', 'sessions'],
            });
            res.json({ success: true, data: plans });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    }

    static async findOne(req: Request, res: Response) {
        try {
            const plan = await workoutPlanRepo.findOne({
                where: { id: req.params.id },
                relations: ['member', 'trainer', 'sessions'],
            });
            if (!plan) return res.status(404).json({ success: false, message: 'Not found' });
            res.json({ success: true, data: plan });
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const plan = await workoutPlanRepo.findOneBy({ id: req.params.id });
            if (!plan) return res.status(404).json({ success: false, message: 'Not found' });
            workoutPlanRepo.merge(plan, req.body);
            const result = await workoutPlanRepo.save(plan);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(400).json({ success: false, error });
        }
    }

    static async remove(req: Request, res: Response) {
        try {
            const plan = await workoutPlanRepo.findOneBy({ id: req.params.id });
            if (!plan) return res.status(404).json({ success: false, message: 'Not found' });
            await workoutPlanRepo.remove(plan);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ success: false, error });
        }
    }
}
