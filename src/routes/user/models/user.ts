export class User {
  constructor(
    public fullName?: string,
    public username?: string,
    public email?: string,
    public password?: string,
    public profileImageURL?: string
  ) {}
}