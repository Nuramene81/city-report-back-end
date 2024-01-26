import { Pool } from '../../../../db-pool';
import { DB_CONFIG_OPTIONS } from '../../../../constants';
import { Issue } from '../models/issue';

export class EditIssueGateway {

  private pool = new Pool();

  constructor() {
    this.pool.connect(DB_CONFIG_OPTIONS);
  }

  public async IsExistingIssue(issueUUID: string): Promise<boolean> {
    const data = await this.pool.query(
      `SELECT * FROM "Issues" 
        WHERE "ID" = $1;`,
      [
        issueUUID
      ]
    );

    return data.rowCount > 0;
  }

  public async UpdateIssue(issue: Issue): Promise<void> {
    await this.pool.query(
      `UPDATE "Issues" SET
        "Title" = $1, "Description" = $2, "IssueLatitude" = $3, "IssueLongitude" = $4
        WHERE "ID" = $5;`, 
      [
        issue.title as string, 
        issue.description as string, 
        issue.issueLatitude as string,
        issue.issueLongitude as string,
        issue.issueUUID as string
      ]
    );   
  }
  
}