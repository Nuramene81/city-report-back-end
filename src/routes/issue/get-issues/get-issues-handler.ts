import { Request, Response } from 'express';
import { GetIssuesGateway } from './get-issues-gateway';
import { GetIssuesTransaction } from './get-issues-transaction';

export async function getIssuesHandler(req: Request, res: Response) {
  const transaction = new GetIssuesTransaction(new GetIssuesGateway());
  try {
    const response = await transaction.Get();
    res.status(201).json(response);
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
