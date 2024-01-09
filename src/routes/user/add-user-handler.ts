import { Request, Response } from 'express';
import { AddUserTransaction } from './add-user-transaction';
import { AddUserGateway } from './add-user-gateway';
import { User } from './models/user';

export async function addUserHandler(req: Request, res: Response) {
  const transaction = new AddUserTransaction(new AddUserGateway());
  try {
    await transaction.Add(makeRequestIntoUserRequest(req));
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
      return;
    }
  }
}

function makeRequestIntoUserRequest(req: Request): User {
  return {
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
}