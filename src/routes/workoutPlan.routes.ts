import { Router } from 'express';
import { WorkoutPlanController } from '../controllers/workout-plan.controller';

const router = Router();

router.post('/', WorkoutPlanController.create);
router.get('/', WorkoutPlanController.findAll);
router.get('/:id', WorkoutPlanController.findOne as any);
router.put('/:id', WorkoutPlanController.update as any);
router.delete('/:id', WorkoutPlanController.remove as any);

export default router;
