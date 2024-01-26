import { EditIssueGateway } from './edit-issue-gateway';
import { Issue } from '../models/issue';

const ISSUE_ERROR = 'Issue doesnt exist';

export class EditIssueTransaction {

  private editIssueRequest!: Issue;

  constructor(
    private gateway: EditIssueGateway
  ) {}

  public async Update(issueRequest: Issue): Promise<void> {
    this.editIssueRequest = issueRequest;
    await this.validateRequest();
    await this.gateway.UpdateIssue(this.editIssueRequest);
  }

  private async validateRequest() {
    await this.validateIssue();
  }
  
  private async validateIssue() {
    if (!await this.gateway.IsExistingIssue(this.editIssueRequest.issueUUID as string)) {
      throw new Error(ISSUE_ERROR);
    }
  }

}