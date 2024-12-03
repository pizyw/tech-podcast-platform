import express from 'express';
import { auth } from '../middleware/auth.middleware';
import {
  createPodcast,
  getPodcasts,
  getPodcastById,
  updatePodcast,
  deletePodcast,
  updatePlays,
  toggleLike
} from '../controllers/podcast.controller';

const router = express.Router();

// 公开路由
router.get('/', getPodcasts);
router.get('/:id', getPodcastById);
router.put('/:id/plays', updatePlays);

// 需要认证的路由
router.post('/', auth, createPodcast);
router.put('/:id', auth, updatePodcast);
router.delete('/:id', auth, deletePodcast);
router.post('/:id/like', auth, toggleLike);

export default router;
