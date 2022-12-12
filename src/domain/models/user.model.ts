export class UserWithoutPasswordModel {
  id: number;
  username: string;
  createDate: Date;
  updatedDate: Date;
  lastLogin: Date;
  hashRefreshToken: string;
}

export class UserModel extends UserWithoutPasswordModel {
  password: string;
}
