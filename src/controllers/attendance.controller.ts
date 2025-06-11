import { Request, Response } from 'express';
import { AttendanceService } from '../Service/attendance.service';

export const AttendanceController = {
  getAll: async (_req: Request, res: Response) => {
    const data = await AttendanceService.getAll();
    res.json({ success: true, data });
  },

  getById: async (req: Request, res: Response) => {
    const data = await AttendanceService.getById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Attendance not found' });
    res.json({ success: true, data });
  },

  create: async (req: Request, res: Response) => {
    try {
      const data = await AttendanceService.create(req.body);
      res.status(201).json({ success: true, data });
    } catch (err) {
      res.status(400).json({ success: false, message: 'Invalid data', error: err });
    }
  },

  update: async (req: Request, res: Response) => {
    const updated = await AttendanceService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Attendance not found' });
    res.json({ success: true, data: updated });
  },

  delete: async (req: Request, res: Response) => {
    const removed = await AttendanceService.remove(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: 'Attendance not found' });
    res.status(204).send();
  },
};
