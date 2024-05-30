import { NextFunction, Request, Response } from 'express';
import { dbquery } from '../DB/DB.js';
import { Map, mapGetParams } from '../Types/Map.js';
import { MapMarkerModel } from '../Types/MapMarker.js';

export const maps_get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = await dbquery('SELECT * FROM MAPS');
    res.status(200).send(query.rows);
  } catch (error) {
    next(error);
  }
};

export const map_get = async (req: Request<mapGetParams>, res: Response, next: NextFunction) => {
  try {
    const mapQuery = await dbquery<Map>(`SELECT * FROM MAPS WHERE MAP_ID=${req.params.map_id}`);
    const mapMarkersQuery = await dbquery<MapMarkerModel>(
      `SELECT IMG, NAME FROM MAP_MARKERS WHERE MAP_ID = ${req.params.map_id}`
    );

    if (!mapQuery.rows.length) {
      return res.status(404).send({ message: 'Map not found' });
    }

    const obj = { ...mapQuery.rows[0], map_data: mapMarkersQuery.rows };
    res.status(200).send(obj);
  } catch (error) {
    next(error);
  }
};
