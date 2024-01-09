import { User } from './models/user';
import { AddUserGateway } from './add-user-gateway';

const USERNAME_ERROR = 'Username already exists';
const EMAIL_ERROR = 'Email already exists';

export class AddUserTransaction {

  private addUserRequest!: User;

  constructor(
    private gateway: AddUserGateway
  ) {}

  public async Add(userRequest: User) {
    this.addUserRequest = userRequest;
    await this.validateRequest();
    await this.gateway.Add(this.addUserRequest);
  }

  private async validateRequest() {
    await this.validateEmail();
    await this.validateUsername();
  }

  private async validateEmail() {
    if (await this.gateway.IsExistingEmail(this.addUserRequest.email as string)) {
      throw new Error(EMAIL_ERROR);
    }
  }
  
  private async validateUsername() {
    if (await this.gateway.IsExistingUsername(this.addUserRequest.username as string)) {
      throw new Error(USERNAME_ERROR);
    }
  }
}