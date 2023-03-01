import express from 'express'
import { refreshToken } from '../controllers/RefreshToken.js';
import { getUsers, getUserById, Register, Login, Logout } from '../controllers/Users.js';
import { verifyToken } from '../middleware/VerifyToken.js';
const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/users/:id',verifyToken,getUserById);
router.post('/users',Register);
router.post('/login',Login);
router.get('/token',refreshToken);
router.delete('/logout',Logout);


export default router;