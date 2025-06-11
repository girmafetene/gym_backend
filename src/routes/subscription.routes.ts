import { Router } from 'express';
import { SubscriptionController } from '../controllers/subscription.controller';

const router = Router();

router.get('/', SubscriptionController.getAll);
router.get('/:id', SubscriptionController.getById);
router.post('/', SubscriptionController.create);
router.put('/:id', SubscriptionController.update);
router.delete('/:id', SubscriptionController.delete);

export default router;
