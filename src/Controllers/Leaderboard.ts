import { NextFunction, Request, Response } from 'express';
import { dbquery } from '../DB/DB.js';

export const leaderboard_get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = await dbquery('SELECT * FROM LEADERBOARD ORDER BY TIME ASC LIMIT 10');
    res.status(200).send(query.rows);
  } catch (error) {
    next(error);
  }
};

interface leaderboardPostBody {
  name: string;
  time: number;
  map_id: number;
}

export const leaderboard_post = async (
  req: Request<Record<string, never>, Record<string, never>, leaderboardPostBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryParams = [req.body.name, req.body.time, req.body.map_id];
    await dbquery('INSERT INTO LEADERBOARD (name, time, map_id) VALUES ($1, $2, $3)', queryParams);
    next();
  } catch (error) {
    next(error);
  }
};
