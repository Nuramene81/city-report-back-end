import { Request, Response } from 'express';
import { Pool } from '../../../../db-pool';
import { DB_CONFIG_OPTIONS } from '../../../../constants';
import { User } from '../../user/models/user';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function getCurrentUserHandler(req: Request, res: Response) {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader.split(' ')[0] !== 'Bearer') {
    throw new Error('Invalid or missing token');
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    throw new Error('Invalid token');
  }

  const pool = new Pool();
  pool.connect(DB_CONFIG_OPTIONS);
  const data = await pool.query(
    'SELECT * FROM "Users" WHERE "ID" = $1',
    [(decodedToken as JwtPayload).userUUID as string,]
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