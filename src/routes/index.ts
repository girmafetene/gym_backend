
import { Router } from "express";
import memberRoutes from './member.routes';
import membershipPlanRoutes from './membershipPlan.routes';
import paymentRoutes from './payment.routes';
import scheduleRoutes from './schedule.routes';
import subscriptionRoutes from './subscription.routes';
import trainerRoutes from './trainer.routes';
import workoutPlanRoutes from './workoutPlan.routes';
import WorkoutSessionRouter from './WorkoutSessionRouter';
import attendanceRoutes from './attendance.routes';
import dietItemRoutes from './diet-item.routes';
import dietPlanRoutes from './dietPlan.routes';
const router = Router();

router.use('/members', memberRoutes);
router.use('/membership-plans', membershipPlanRoutes);
router.use('/payments', paymentRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/trainers', trainerRoutes);
router.use('/workout-plans', workoutPlanRoutes);
router.use('/workout-sessions', WorkoutSessionRouter);
router.use('/attendances', attendanceRoutes);
router.use('/diet-item', dietItemRoutes);
router.use('/diet-plan', dietPlanRoutes);

export default router;