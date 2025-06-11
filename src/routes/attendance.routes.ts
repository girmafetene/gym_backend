// routes/attendance.routes.ts
import { Router } from 'express';
import { AttendanceController } from '../controllers/attendance.controller';

const router = Router();

router.get('/', AttendanceController.getAll);
router.get('/:id', AttendanceController.getById as any);
router.post('/', AttendanceController.create);
router.put('/:id', AttendanceController.update as any);
router.delete('/:id', AttendanceController.delete as any);

export default router;
