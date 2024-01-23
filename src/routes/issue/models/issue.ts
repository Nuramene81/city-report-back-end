import { User } from "../../user/models/user";

export class Issue {
  constructor(
    public issueUUID?: string,
    public title?: string,
    public reportedBy?: User,
    public description?: string,
    public area?: string,
    public geolocation?: string,
    public dateReported?: string,
    public status?: string,
    public issueImages?: string[]
  ) {}
}