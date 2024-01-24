import { Issue } from '../models/issue';
import { GetIssuesGateway } from './get-issues-gateway';

export class GetIssuesTransaction {

  constructor(
    private gateway: GetIssuesGateway
  ) {}

  public async Get(): Promise<Issue[]> {
    const issues = await this.gateway.GetIssues();

    return issues;
  }
}