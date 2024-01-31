import { Request, Response } from 'express';
declare module 'express-session' {
  interface Session {
    userUUID: string;
  }
}

export async function logoutHandler(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json({ message: 'Logout failed' });
      return;
    }
    res.status(200).json({ message: 'Logout Successful!' });
    return;
  });
}