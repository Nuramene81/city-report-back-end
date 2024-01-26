import { DeleteIssueGateway } from './delete-issue-gateway';
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  secure: true,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export class DeleteIssueTransaction {

  constructor(
    private gateway: DeleteIssueGateway
  ) {}

  public async Delete(issueUUID: string): Promise<void> {
    await this.DeleteIssueImages(issueUUID);
    await this.gateway.DeleteIssue(issueUUID);
  }

  public async DeleteIssueImages(issueUUID: string): Promise<void> {
    const imageURLs = await this.gateway.GetIssueImageURLs(issueUUID);
    for (const imageURL of imageURLs) {
      const publicID = imageURL.split('/').pop()?.split('.')[0];
      await cloudinary.uploader.destroy(publicID as string);
    }
    await this.gateway.DeleteIssueImages(issueUUID);
  }

}