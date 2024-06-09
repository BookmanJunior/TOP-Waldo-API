import { Router } from 'express';
import { map_get, maps_get } from '../Controllers/Map.js';
import { startGame } from '../Controllers/Game.js';

const router = Router();

router.get('/', maps_get);

router.get('/:map_id', map_get, startGame);

export default router;
