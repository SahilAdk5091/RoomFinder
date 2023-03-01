import express from 'express'
import {
    getRoom,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
} from '../controllers/Products.js';
import { verifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

router.get('/products',verifyToken,getRoom);
router.get('/products/:id',verifyToken,getRoomById);
router.post('/products',verifyToken,createRoom);
router.patch('/products/:id',verifyToken,updateRoom);
router.delete('/products/:id',verifyToken,deleteRoom);

export default router;
