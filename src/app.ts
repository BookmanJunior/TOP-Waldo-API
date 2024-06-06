import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import MapRouter from './Routes/Map.js';
import LeaderboardRouter from './Routes/Leaderboard.js';
import MapMakerRouter from './Routes/MapMarker.js';

const app = express();
const port = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7',
  legacyHeaders: false
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://top-waldo.vercel.app']
  })
);
app.use(helmet());
app.use(limiter);

app.use('/maps', MapRouter);
app.use('/leaderboard', LeaderboardRouter);
app.use('/marker', MapMakerRouter);

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
