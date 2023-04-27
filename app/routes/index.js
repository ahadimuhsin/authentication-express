import express from "express";
import { Login, Logout, getUsers } from "../controllers/User.js";
import multer from "multer";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/login', multer().none(), Login);
router.post('/logout', multer().none(), Logout);
router.get('/token', multer().none(), refreshToken);

export default router;