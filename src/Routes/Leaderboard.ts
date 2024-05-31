import { Router } from 'express';
import { leaderboard_get, leaderboard_post } from '../Controllers/Leaderboard.js';

const router = Router();

router.get('/:map_id', leaderboard_get);

router.post('/', leaderboard_post);

export default router;
