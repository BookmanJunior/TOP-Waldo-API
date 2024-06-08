import { NextFunction, Request, Response } from 'express';

export const UnexpectedErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.log(err.stack);
  return res.status(500).send({ message: 'Server error. Try again.' });
};
