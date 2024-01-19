import { AddIssueGateway } from './add-issue-gateway';
import { Issue } from '../models/issue';
import { IssueImage } from '../models/issue-image';

const USER_ERROR = 'User doesnt exist';

export class AddIssueTransaction {

  private addIssueRequest!: Issue;
  private issueUUID!: string;

  constructor(
    private gateway: AddIssueGateway
  ) {}

  public async Add(issueRequest: Issue): Promise<void> {
    this.addIssueRequest = issueRequest;
    await this.validateRequest();
    this.issueUUID = await this.gateway.AddIssue(this.addIssueRequest);
    await this.addIssueImages(this.addIssueRequest.issueImages as string[]);
  }

  private async validateRequest() {
    await this.validateUser();
  }
  
  private async validateUser() {
    if (!await this.gateway.IsExistingUser(this.addIssueRequest.reportedBy?.userUUID as string)) {
      throw new Error(USER_ERROR);
    }
  }

  private async addIssueImages(imageURLs: string[]) {
    for (const imageURL of imageURLs) {
      await this.gateway.AddIssueImage(
        new IssueImage(
          undefined,
          this.issueUUID,
          imageURL
        )
      );
    }
  }
}