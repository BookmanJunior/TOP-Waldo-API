import { NextFunction, Request, Response } from 'express';
import { dbquery } from '../DB/DB.js';
import { Leaderboard, leaderboardPostBody, mapId } from '../Types/Leaderboard.js';

export const leaderboard_all_get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = await dbquery<Leaderboard>(`SELECT * FROM LEADERBOARD ORDER BY TIME ASC`);
    res.status(200).send(query.rows);
  } catch (error) {
    next(error);
  }
};

export const leaderboard_get = async (req: Request<mapId>, res: Response, next: NextFunction) => {
  try {
    const query = await getLeaderboard(req.params.map_id);
    res.status(200).send(query.rows);
  } catch (error) {
    next(error);
  }
};

export const leaderboard_post = async (
  req: Request<Record<string, never>, Record<string, never>, leaderboardPostBody>,
  res: Response,
  next: NextFunction
) => {
  const queryParams = [req.body.name, req.body.map_id];

  try {
    await dbquery('INSERT INTO LEADERBOARD (name, time, map_id) VALUES ($1, $2, $3)', queryParams);
    const query = await getLeaderboard(req.body.map_id);

    res.status(200).send(query.rows);
  } catch (error) {
    next(error);
  }
};

async function getLeaderboard(map_id: number) {
  return await dbquery<Leaderboard>(
    `SELECT * FROM LEADERBOARD WHERE MAP_ID = ${map_id} ORDER BY TIME ASC LIMIT 10`
  );
}
