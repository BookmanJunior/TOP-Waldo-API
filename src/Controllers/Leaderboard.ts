import { NextFunction, Request, Response } from 'express';
import { dbquery } from '../DB/DB.js';
import { Leaderboard, leaderboardPostBody, mapId } from '../Types/Leaderboard.js';
import { body, validationResult } from 'express-validator';

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

export const leaderboard_post = [
  body('name', 'Name must be longer than 1 character and less than 15 characters')
    .trim()
    .isLength({ min: 2, max: 15 })
    .escape(),
  body('map_id').trim().escape(),

  async (
    req: Request<Record<string, never>, Record<string, never>, leaderboardPostBody>,
    res: Response,
    next: NextFunction
  ) => {
    const errorFormatter = ({ msg }: { msg: string }) => {
      return msg;
    };
    const error = validationResult(req).formatWith(errorFormatter);

    if (!req.session.finalTime) {
      const error = new Error('Current session missing final time');
      return next(error);
    }

    const queryParams = [req.body.name, req.session.finalTime, req.body.map_id];

    if (!error.isEmpty()) {
      return res.status(400).send(error.mapped());
    }

    try {
      await dbquery(
        'INSERT INTO LEADERBOARD (name, time, map_id) VALUES ($1, $2, $3)',
        queryParams
      );
      const query = await getLeaderboard(req.body.map_id);

      res.status(200).send(query.rows);
    } catch (error) {
      next(error);
    }
  }
];

async function getLeaderboard(map_id: number) {
  return await dbquery<Leaderboard>(
    `SELECT * FROM LEADERBOARD WHERE MAP_ID = ${map_id} ORDER BY TIME ASC LIMIT 10`
  );
}
