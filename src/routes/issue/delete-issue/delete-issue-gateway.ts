import { Pool } from '../../../../db-pool';
import { DB_CONFIG_OPTIONS } from '../../../../constants';

export class DeleteIssueGateway {

  private pool = new Pool();

  constructor() {
    this.pool.connect(DB_CONFIG_OPTIONS);
  }

  public async DeleteIssue(issueUUID: string): Promise<void> {
    await this.pool.query(
      `DELETE FROM "Issues" WHERE "ID" = $1;`, 
      [
        issueUUID
      ]
    );
  }

  public async GetIssueImageURLs(issueUUID: string): Promise<string[]> {
    const issueImageURLs = [];
    const result = await this.pool.query(
      `SELECT "ImageURL" FROM "IssueImages" WHERE "IssueUUID" = $1;`, 
      [
        issueUUID
      ]
    );

    for (const row of result.rows) {
      issueImageURLs.push(row.ImageURL);
    }

    return issueImageURLs;
  }

  public async DeleteIssueImages(issueUUID: string): Promise<void> {
    await this.pool.query(
      `DELETE FROM "IssueImages" WHERE "IssueUUID" = $1;`, 
      [
        issueUUID
      ]
    );
  }
}