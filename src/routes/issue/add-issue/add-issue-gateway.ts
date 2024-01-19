import { Pool } from '../../../../db-pool';
import { DB_CONFIG_OPTIONS } from '../../../../constants';
import { Issue } from '../models/issue';
import { IssueImage } from '../models/issue-image';

export class AddIssueGateway {

  private pool = new Pool();

  constructor() {
    this.pool.connect(DB_CONFIG_OPTIONS);
  }

  public async AddIssue(issue: Issue): Promise<Issue> {
    const data = await this.pool.query(
      `INSERT INTO "Issues" (
        "Title", "ReportByUserUUID", "Description", "Area", "Geolocation",
        "DateReported", "Status"
      )
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "ID";`, 
      [
        issue.title as string, 
        issue.reportedBy?.userUUID as string, 
        issue.description as string, 
        issue.area as string, 
        issue.geolocation as string, 
        issue.dateReported as string, 
        issue.status as string
      ]
    );

    return new Issue(
      data.rows[0].ID
    )
  }
  
  public async AddIssueImage(issueImage: IssueImage): Promise<void> {
    const data = await this.pool.query(
      `INSERT INTO "IssueImages" (
        "IssueUUID", "ImageURL"
      )
        VALUES ($1, $2);`, 
      [
        issueImage.issueUUID as string, 
        issueImage.imageURL as string
      ]
    );
  }
}