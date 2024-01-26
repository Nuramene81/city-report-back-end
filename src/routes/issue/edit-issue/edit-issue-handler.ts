import { Request, Response } from 'express';
import { EditIssueGateway } from './edit-issue-gateway';
import { EditIssueTransaction } from './edit-issue-transaction';
import { Issue } from '../models/issue';
import { User } from '../../user/models/user';
declare module 'express-session' {
  interface Session {
    userUUID: string;
  }
}

export async function editIssueHandler(req: Request, res: Response) {
  const transaction = new EditIssueTransaction(new EditIssueGateway());
  try {
    await transaction.Update(makeRequestIntoIssueRequest(req));
    res.status(204).json({ message: 'Issue updated successfully' });
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

function makeRequestIntoIssueRequest(req: Request): Issue {
  const request =  new Issue(
    req.body.issueUUID,
    req.body.title,
    new User(
      req.session.userUUID
    ),
    req.body.description,
    req.body.latitude,
    req.body.longitude
  );
  return request;
}