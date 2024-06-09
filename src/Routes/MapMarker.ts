import { Router } from 'express';
import { map_markers_post } from '../Controllers/MapMarker.js';
import { incrementUserScore, isWinner } from '../Controllers/Game.js';

const router = Router();

router.post('/verify', map_markers_post, incrementUserScore, isWinner);

export default router;
