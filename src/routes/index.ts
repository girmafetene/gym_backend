
import express, { Router } from "express";
import path from "path";
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
import equipmentRoutes from './equipment.routes';
import itemRoutes from './item.routes';
const router = Router();

router.use('/uploads/equipment', express.static(path.join(__dirname, '..', 'uploads/equipment')));
router.use('/equipment', equipmentRoutes);

router.use('/uploads/items', express.static(path.join(__dirname, '..', 'uploads/items')));
router.use('/items', itemRoutes);

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