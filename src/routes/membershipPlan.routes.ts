import { Router } from 'express';
import { MembershipPlanController } from '../controllers/membershipPlan.controller';

const router = Router();

router.get('/', MembershipPlanController.getAll);
router.get('/:id', MembershipPlanController.getById);
router.post('/', MembershipPlanController.create);
router.put('/:id', MembershipPlanController.update);
router.delete('/:id', MembershipPlanController.delete);

export default router;
