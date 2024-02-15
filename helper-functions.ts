import jwt from 'jsonwebtoken';

/*
  Code to possibly use later for protecting routes
  import { NextFunction, Request, Response } from 'express';

  export function isUserLoggedIn(req: Request, res: Response, next: NextFunction) {
    if(!req.session.userUUID){
      res.json({ message: 'You are not logged in' });
      return;
    } else {
      next()
    }
  }
*/

export function createJWTToken(userUUID: string) {
  return jwt.sign(
    { userUUID },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  );
}
