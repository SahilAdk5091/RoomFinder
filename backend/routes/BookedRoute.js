import express from "express";
import {
    getBookedRoomById
} from "../controllers/BookController.js"
const router = express.Router();

router.get('/book/:userid',getBookedRoomById);

export default router;