import { Request, Response } from 'express';
import { AddIssueGateway } from './add-issue-gateway';
import { AddIssueTransaction } from './add-issue-transaction';
import { Issue } from '../models/issue';
import { User } from '../../user/models/user';
import { v2 as cloudinary } from 'cloudinary';
import { v4 } from 'uuid';
import jwt, { JwtPayload } from 'jsonwebtoken';

cloudinary.config({ 
  secure: true,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const imageURLs: string[] = [];

export async function addIssueHandler(req: Request, res: Response) {
  const transaction = new AddIssueTransaction(new AddIssueGateway());
  try {
    if (req.files){
      for (const file of req.files as Express.Multer.File[]) {
        const result: any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({
            resource_type: 'auto',
            public_id: v4(),
            buffer: file.buffer
          }, (err: any, result: any) => {
            if (err) {
              console.log('error uploading to cloudinary');
              console.log(err);
              reject(err);
            } else {
              console.log('uploaded to cloudinary');
              resolve(result);
            }
          }).end(file.buffer);
        }).then((result) => {
          return result;
        });
        imageURLs.push(result.secure_url);
      };
    }
    
    await transaction.Add(makeRequestIntoIssueRequest(req));
    imageURLs.length = 0;
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

  const request = new Issue(
    undefined,
    req.body.title,
    new User(
      (decodedToken as JwtPayload).userUUID as string,
    ),
    req.body.description,
    req.body.latitude,
    req.body.longitude,
    undefined,
    undefined,
    imageURLs,
  );

  return request;
}