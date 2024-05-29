import { Router } from 'express';
import { leaderboard_get, leaderboard_post } from '../Controllers/Leaderboard.js';

const router = Router();

router.get('/', leaderboard_get);

router.post('/', leaderboard_post, leaderboard_get);

export default router;
