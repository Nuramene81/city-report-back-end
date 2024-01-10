import { NextFunction, Request, Response } from 'express';

export function isUserLoggedIn(req: Request, res: Response, next: NextFunction) {
  if(!req.session.userUUID){
    res.json({ message: 'You are not logged in' });
    return;
  } else {
    next()
  }
}
