// src/routes/WorkoutSessionRouter.ts
import { Router } from 'express';
import { WorkoutSessionController } from '../controllers/WorkoutSessionController';

const router = Router();

router.post('/', WorkoutSessionController.create);
router.get('/', WorkoutSessionController.findAll);
router.get('/:id', WorkoutSessionController.findOne as any);
router.put('/:id', WorkoutSessionController.update as any);
router.delete('/:id', WorkoutSessionController.remove as any);

export default router;
