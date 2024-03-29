import express from "express";
import {
    getRoom,
    getRoomById,
    saveRoom,
    updateRoom,
    deleteRoom,
    findRoom,
} from "../controllers/RoomController.js"
import { verifyToken } from '../middleware/VerifyToken.js';
import { refreshToken } from '../controllers/RefreshToken.js';

const router = express.Router();

router.get('/rooms',getRoom);
router.get('/rooms/:userid',getRoomById);
router.post('/rooms',saveRoom);
router.patch('/rooms/:id', updateRoom);
router.delete('/rooms/:id', deleteRoom);
router.get('/findroom/:id', findRoom);

export default router;