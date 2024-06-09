import express, { CookieOptions } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { pool } from './DB/DB.js';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import * as dotenv from 'dotenv';

import MapRouter from './Routes/Map.js';
import LeaderboardRouter from './Routes/Leaderboard.js';
import MapMakerRouter from './Routes/MapMarker.js';
import { UnexpectedErrorHandler } from './Helpers/UnexpectedErrorHandler.js';

dotenv.configDotenv();
const app = express();
const port = process.env.PORT || 3000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7',
  legacyHeaders: false
});
const pgStore = pgSession(session);
const cookieOptions: CookieOptions = {
  secure: process.env.NODE_ENV === 'development' ? false : true,
  sameSite: process.env.NODE_ENV === 'development' ? 'strict' : 'none',
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000
} as const;

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://top-waldo.vercel.app'],
    credentials: true
  })
);

if (!process.env.COOKIE_SECRET) {
  throw new Error('Missing Cookie Secret');
}

app.use(helmet());
app.use(limiter);
app.use(
  session({
    store: new pgStore({
      pool: pool,
      tableName: 'session',
      createTableIfMissing: true
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: cookieOptions
  })
);

app.use('/maps', MapRouter);
app.use('/leaderboard', LeaderboardRouter);
app.use('/marker', MapMakerRouter);
app.use(UnexpectedErrorHandler);

app.listen(port, () => {
  console.log(`Starting server on port ${port}`);
});
