import { User } from "../../user/models/user";

export class Issue {
  constructor(
    public issueUUID?: string,
    public title?: string,
    public reportedBy?: User,
    public description?: string,
    public issueLatitude?: string,
    public issueLongitude?: string,
    public dateReported?: string,
    public status?: string,
    public issueImages?: string[]
  ) {}
}