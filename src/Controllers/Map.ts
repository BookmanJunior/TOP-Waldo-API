import { NextFunction, Request, Response } from 'express';
import { dbquery } from '../DB/DB.js';

export const maps_get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = await dbquery('SELECT * FROM MAPS');
    res.status(200).send(query.rows);
  } catch (error) {
    next(error);
  }
};

interface map_get {
  map_id: string;
}

export const map_get = async (req: Request<map_get>, res: Response, next: NextFunction) => {
  try {
    const query = await dbquery(`SELECT * FROM MAPS WHERE MAP_ID=${req.params.map_id}`);

    if (!query.rows.length) {
      return res.status(404).send({ message: 'Map not found' });
    }

    res.status(200).send(query.rows[0]);
  } catch (error) {
    next(error);
  }
};
