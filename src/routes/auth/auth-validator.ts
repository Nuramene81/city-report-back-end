import { Request, Response } from 'express';
declare module 'express-session' {
  interface Session {
    userUUID: string;
  }
}

export async function authHandler(req: Request, res: Response) {
  if (req.session.userUUID) {
    res.status(200).json({ isLoggedIn: true });
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
}