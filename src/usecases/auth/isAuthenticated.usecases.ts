import {
  UserModel,
  UserWithoutPasswordModel,
} from "../../domain/models/user.model";
import { UserRepositoryType } from "../../domain/repositories/user.repositories";

export class IsAuthenticatedUseCases {
  constructor(private readonly adminUserRepo: UserRepositoryType) {}

  async execute(username: string): Promise<UserWithoutPasswordModel> {
    const user: UserModel = await this.adminUserRepo.getUserByUsername(
      username
    );
    const { password, ...info } = user;
    return info;
  }
}
