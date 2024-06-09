import { NextFunction, Request, Response } from 'express';
import { dbquery } from '../DB/DB.js';
import { MapMarkerModel, mapMarkersPost } from '../Types/MapMarker.js';
import { body, validationResult } from 'express-validator';

export const map_markers_post = [
  body('x').trim().isLength({ min: 1 }).escape(),
  body('y').trim().isLength({ min: 1 }).escape(),
  body('charName').trim().isLength({ min: 1 }).escape(),

  async (
    req: Request<Record<string, never>, Record<string, never>, mapMarkersPost>,
    res: Response,
    next: NextFunction
  ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ message: 'Something went wrong. Try again.' });
    }

    try {
      const query = await dbquery<MapMarkerModel>(
        `SELECT * FROM MAP_MARKERS WHERE NAME = '${req.body.charName}'`
      );

      if (
        Math.abs(req.body.x - query.rows[0].x) >= 5 &&
        Math.abs(req.body.y - query.rows[0].y) >= 5
      ) {
        return res.sendStatus(400);
      }

      next();
    } catch (error) {
      next(error);
    }
  }
];
