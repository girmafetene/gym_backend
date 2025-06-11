import { Router } from 'express';
import { TrainerController } from '../controllers/trainer.controller';

const router = Router();

router.get('/', TrainerController.getAll);
router.get('/:id', TrainerController.getById);
router.post('/', TrainerController.create);
router.put('/:id', TrainerController.update);
router.delete('/:id', TrainerController.delete);

export default router;
