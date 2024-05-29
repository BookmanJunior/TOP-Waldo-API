import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import MapRouter from './Routes/Map.js';
import LeaderboardRouter from './Routes/Leaderboard.js';
import MapMakerRouter from './Routes/MapMarker.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:5173'
  })
);

app.use('/maps', MapRouter);
app.use('/leaderboard', LeaderboardRouter);
app.use('/marker', MapMakerRouter);

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
