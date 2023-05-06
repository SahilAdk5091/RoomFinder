import express from 'express'
import { refreshToken } from '../controllers/RefreshToken.js';
import { getUsers,getUsersById, Register, Login, Logout, postbook,getBookedRoomById,getCrateId } from '../controllers/Users.js';
import { verifyToken } from '../middleware/VerifyToken.js';
const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/iduser/:userid', verifyToken, getUsersById);
router.get('/book/:userid', verifyToken, getBookedRoomById);
router.get('/crate/:buserid', verifyToken, getCrateId);
router.post('/users', Register);
router.post('/booked', postbook);
router.post('/login',Login);
router.get('/token',refreshToken);
router.delete('/logout',Logout);


export default router;