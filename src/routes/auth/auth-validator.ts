import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function authHandler(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  } else if (authHeader.split(' ')[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token' });
  } else {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      } else {
        return res.status(200).json({ message: 'Token is valid' });
      }
    });
  }

}