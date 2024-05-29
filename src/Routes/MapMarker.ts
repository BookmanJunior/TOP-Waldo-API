import { Router } from 'express';
import { map_markers_post } from '../Controllers/MapMarker.js';

const router = Router();

router.post('/verify', map_markers_post);

export default router;
