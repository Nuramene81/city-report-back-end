import { Pool } from '../../../../db-pool';
import { DB_CONFIG_OPTIONS } from '../../../../constants';
import { Issue } from '../models/issue';
import { User } from '../../user/models/user';

export class GetIssuesGateway {

  private pool = new Pool();
  private sqlString = '';

  constructor() {
    this.pool.connect(DB_CONFIG_OPTIONS);
  }

  public async GetIssues(searchString?: string): Promise<Issue[]> {
    if (searchString) {
      this.sqlString = `
      SELECT * FROM "Issues" 
        WHERE "Title" ILIKE '%${searchString}%' 
        OR "Description" ILIKE '%${searchString}%' 
        ORDER BY "DateReported" DESC;`;
      
    } else {
      this.sqlString = `SELECT * FROM "Issues" ORDER BY "DateReported" DESC;`;
    }
    const data = await this.pool.query(
      this.sqlString, 
      []
    );

    if (data.rows.length === 0) {
      return [];
    }

    return await this.makeIssues(data);
  }

  private async makeIssues(data: any){
    const issues: Issue[] = [];
    for (const row of data.rows) {
      issues.push(new Issue(
        row.ID,
        row.Title,
        await this.getUser(row.ReportedByUserUUID),
        row.Description,
        row.IssueLatitude,
        row.IssueLongitude,
        new Date(row.DateReported).toISOString().split('T')[0],
        row.Status,
        await this.getIssueImages(row.ID)
      ));
    }

    return issues;
  }

  private async getUser(userUUID: string): Promise<User> {
    const user = await this.pool.query(
      `SELECT * FROM "Users" WHERE "ID" = $1;`, 
      [
        userUUID
      ]
    );

    return new User(
      user.rows[0].ID,
      user.rows[0].FullName,
      user.rows[0].Username
    );
  }

  private async getIssueImages(issueUUID: string): Promise<string[]> {
    const imageURLs: string[] = [];
    const data = await this.pool.query(
      `SELECT * FROM "IssueImages" WHERE "IssueUUID" = $1;`, 
      [
        issueUUID
      ]
    );
    data.rows.forEach((row: any) => {
      imageURLs.push(row.ImageURL);
    });

    return imageURLs;   
  }
  
}