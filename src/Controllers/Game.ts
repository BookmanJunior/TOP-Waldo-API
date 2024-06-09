import { NextFunction, Request, Response } from 'express';
import { mapGetRes, mapGetParams } from '../Types/Map.js';

export const startGame = (
  req: Request<mapGetParams>,
  res: Response<{ message: string } | mapGetRes, { gameData: mapGetRes }>
) => {
  req.session.startTime = Date.now();
  req.session.finalTime = 0;
  req.session.foundMarkers = 0;
  req.session.numOfMarkers = res.locals.gameData.map_data.length;

  res.status(200).send(res.locals.gameData);
};

export const incrementUserScore = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.foundMarkers) {
    req.session.foundMarkers++;
  } else {
    req.session.foundMarkers = 1;
  }
  next();
};

export const isWinner = (req: Request, res: Response) => {
  if (req.session.foundMarkers === req.session.numOfMarkers && req.session.startTime) {
    req.session.finalTime = Date.now() - req.session.startTime;
  }
  return res.sendStatus(200);
};
