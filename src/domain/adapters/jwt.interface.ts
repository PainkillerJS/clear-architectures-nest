export interface JwtServicePayloadType {
  username: string;
}

export interface JwtServiceType {
  checkToken(token: string): Promise<any>;
  createToken(
    payload: JwtServicePayloadType,
    secret: string,
    expiresIn: string
  ): string;
}
