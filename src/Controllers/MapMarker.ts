import { NextFunction, Request, Response } from 'express';
import { dbquery } from '../DB/DB.js';
import { MapMarkerModel, mapMarkersPost } from '../Types/MapMarker.js';

export const map_markers_post = async (
  req: Request<Record<string, never>, Record<string, never>, mapMarkersPost>,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = await dbquery<MapMarkerModel>(
      `SELECT * FROM MAP_MARKERS WHERE NAME = '${req.body.charName}'`
    );

    if (
      Math.abs(req.body.x - query.rows[0].x) <= 5 &&
      Math.abs(req.body.y - query.rows[0].y) <= 5
    ) {
      return res.sendStatus(200);
    }

    return res.sendStatus(400);
  } catch (error) {
    next(error);
  }
};
