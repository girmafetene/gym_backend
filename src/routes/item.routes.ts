// src/routes/item.routes.ts
import { Router } from 'express';
import multer from 'multer';
import { ItemController } from '../controllers/ItemController';

const router = Router();

// Setup multer for uploads
const storage = multer.diskStorage({
    destination: 'uploads/items',
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), ItemController.create);
router.get('/', ItemController.getAll);
router.get('/:id', ItemController.getById);
router.put('/:id', upload.single('image'), ItemController.update);
router.delete('/:id', ItemController.delete);

export default router;
