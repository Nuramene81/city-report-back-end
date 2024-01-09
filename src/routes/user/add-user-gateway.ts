import { Pool } from '../../../db-pool';
import { DB_CONFIG_OPTIONS } from '../../../constants';
import { User } from './models/user';
import bcrypt from 'bcrypt';

export class AddUserGateway {

  private pool = new Pool();

  constructor() {
    this.pool.connect(DB_CONFIG_OPTIONS);
  }

  public async IsExistingEmail(email: string) {
    const result = await this.pool.query(
      `SELECT "Email" FROM "Users" WHERE "Email" = $1;`,
      [email]
    );
    return result.rowCount > 0;
  }

  public async IsExistingUsername(username: string) {
    const result = await this.pool.query(
      `SELECT "Username" FROM "Users" WHERE "Username" = $1;`,
      [username]
    );
    return result.rowCount > 0;
  }

  public async Add(user: User) {
    await this.pool.query(
      `INSERT INTO "Users" (
        "FullName", "Username", "Email", "Password", "ProfileImageURL"
      )
        VALUES ($1, $2, $3, $4, $5);`, 
      [
        user.fullName, 
        user.username, 
        user.email, 
        await this.hashPassword(user.password),
        user.profileImageURL
      ]
    );
  }

  private async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}