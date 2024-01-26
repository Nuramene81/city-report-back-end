import { Request, Response } from 'express';
import { DeleteIssueGateway } from '../delete-issue/delete-issue-gateway';
import { DeleteIssueTransaction } from '../delete-issue/delete-issue-transaction';

export async function deleteIssueHandler(req: Request, res: Response) {
  const transaction = new DeleteIssueTransaction(new DeleteIssueGateway());
  try {
    await transaction.Delete(req.params.issueUUID as string);
    res.status(201).json({ message: 'Issue deleted successfully' });
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
