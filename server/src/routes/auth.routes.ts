import express from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// 注册新用户
router.post('/register', register);

// 用户登录
router.post('/login', login);

// 获取用户信息
router.get('/profile', auth, getProfile);

export default router;
