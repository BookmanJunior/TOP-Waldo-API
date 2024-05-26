import { Router } from 'express';
import { map_get, maps_get } from '../Controllers/Map.js';

const router = Router();

router.get('/', maps_get);

router.get('/:map_id', map_get);

export default router;
