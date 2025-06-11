// src/routes/equipment.routes.ts
import { Router } from 'express';
import multer from 'multer';
import { EquipmentController } from '../controllers/EquipmentController';

const router = Router();

const storage = multer.diskStorage({
    destination: 'uploads/equipment',
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), EquipmentController.create);
router.get('/', EquipmentController.getAll);
router.get('/:id', EquipmentController.getById);
router.put('/:id', upload.single('image'), EquipmentController.update);
router.delete('/:id', EquipmentController.delete);

export default router;
