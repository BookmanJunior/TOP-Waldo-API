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
    const mapQuery = dbquery<Map>(`SELECT * FROM MAPS WHERE MAP_ID=${req.params.map_id}`);
    const mapMarkersQuery = dbquery<MapMarkerModel>(
      `SELECT IMG, NAME FROM MAP_MARKERS WHERE MAP_ID = ${req.params.map_id}`
    );
    const [mapRes, mapMarkersRes] = await Promise.all([mapQuery, mapMarkersQuery]);

    if (!mapRes.rows.length) {
      return res.status(404).send({ message: 'Map not found' });
    }

    const obj = { ...mapRes.rows[0], map_data: mapMarkersRes.rows };
    res.status(200).send(obj);
  } catch (error) {
    next(error);
  }
};
