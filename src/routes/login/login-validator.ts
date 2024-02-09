import { Request, Response } from 'express';
import { Pool } from '../../../db-pool';
import { DB_CONFIG_OPTIONS } from '../../../constants';
import bcrypt from 'bcrypt';
declare module 'express-session' {
  interface Session {
    userUUID: string;
  }
}

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;
  const pool = new Pool();
  pool.connect(DB_CONFIG_OPTIONS);
  const data = await pool.query(
    'SELECT * FROM "Users" WHERE "Email" = $1',
    [email]
  );

  if (data.rows.length === 0) {
    res.status(400).json({ message: 'Incorrect login details' });
    return;
  }
  const hashedPassword = data.rows[0].Password;
  const isVerified = await bcrypt.compare(password, hashedPassword);
  if (isVerified) {
    req.session.userUUID = data.rows[0].ID;
    console.log('req.session set: ', req.session.userUUID);
    res.status(200).json({ 
      message: 'Login Successful!',
      userUUID: data.rows[0].ID
    });
    return;
  } else {
    res.status(200).json({ message: 'Incorrect login details' });
    return;
  }
}