import { Router } from 'express';
import { DietItemController } from '../controllers/diet-item.controller';

const router = Router();

router.post('/', DietItemController.create);
router.get('/', DietItemController.getAll);
router.get('/:id', DietItemController.getById as any);
router.put('/:id', DietItemController.update);
router.delete('/:id', DietItemController.delete);

export default router;
