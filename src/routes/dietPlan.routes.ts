import { Router } from 'express';
import { DietPlanController } from '../controllers/diet-plan.controller';

const router = Router();

router.post('/', DietPlanController.create);
router.get('/', DietPlanController.getAll);
router.get('/:id', DietPlanController.getById as any);
router.put('/:id', DietPlanController.update);
router.delete('/:id', DietPlanController.delete);

export default router;
