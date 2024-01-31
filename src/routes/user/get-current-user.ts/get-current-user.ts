import { Request, Response } from 'express';
import { Pool } from '../../../../db-pool';
import { DB_CONFIG_OPTIONS } from '../../../../constants';
import { User } from '../../user/models/user';
declare module 'express-session' {
  interface Session {
    userUUID: string;
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  const userUUID = req.session.userUUID;
  const pool = new Pool();
  pool.connect(DB_CONFIG_OPTIONS);
  const data = await pool.query(
    'SELECT * FROM "Users" WHERE "ID" = $1',
    [userUUID]
  );

  if (data.rows.length === 0) {
    res.status(400).json({ message: 'User does not exist' });
    return;
  }

  res.status(200).json(makeUserResponse(data));
  
}

function makeUserResponse(data: any): User {
  return new User(
    data.rows[0].ID,
    data.rows[0].FullName,
    data.rows[0].Username,
    undefined,
    undefined,
    data.rows[0].ProfileImageURL
  );

}