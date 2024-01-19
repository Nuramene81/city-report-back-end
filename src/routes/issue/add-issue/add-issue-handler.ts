import { Request, Response } from 'express';
import { AddIssueGateway } from './add-issue-gateway';
import { AddIssueTransaction } from './add-issue-transaction';
import { Issue } from '../models/issue';
// import { IssueImage } from '../models/issue-image';
import { User } from '../../user/models/user';
declare module 'express-session' {
  interface Session {
    userUUID: string;
  }
}

export async function addIssueHandler(req: Request, res: Response) {
  const transaction = new AddIssueTransaction(new AddIssueGateway());
  try {
    await transaction.Add(makeRequestIntoIssueRequest(req));
    res.status(201).json({ message: 'Issue created' });
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
    undefined,
    req.body.title,
    new User(
      req.session.userUUID
    ),
    req.body.description,
    req.body.area,
    req.body.geolocation,
    req.body.dateReported,
    req.body.status,
    req.body.issueImages
  );
  console.log(request);
  return request;
  
}