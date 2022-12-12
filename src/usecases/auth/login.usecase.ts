import type { BcryptServiceType } from "../../domain/adapters/bcrypt.interface";
import type {
  JwtServiceType,
  JwtServicePayloadType,
} from "../../domain/adapters/jwt.interface";
import type { JWTConfigType } from "../../domain/config/jwt.config";
import type { LoggerType } from "../../domain/logger/logger.interface";
import type { UserRepositoryType } from "../../domain/repositories/user.repositories";

export class LoginUseCases {
  constructor(
    private readonly logger: LoggerType,
    private readonly jwtTokenService: JwtServiceType,
    private readonly jwtConfig: JWTConfigType,
    private readonly userRepository: UserRepositoryType,
    private readonly bcryptService: BcryptServiceType
  ) {}

  async getCookieWithJwtToken(username: string) {
    this.logger.log(
      "LoginUseCases execute",
      `The user ${username} have been logged.`
    );

    const payload: JwtServicePayloadType = { username };

    const secret = this.jwtConfig.getJwtSecret();
    const expiresIn = this.jwtConfig.getJwtExpirationTime() + "s";
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtExpirationTime()}`;
  }

  async getCookieWithJwtRefreshToken(username: string) {
    this.logger.log(
      "LoginUseCases execute",
      `The user ${username} have been logged.`
    );

    const payload: JwtServicePayloadType = { username };

    const secret = this.jwtConfig.getJwtRefreshSecret();
    const expiresIn = this.jwtConfig.getJwtRefreshExpirationTime() + "s";
    const token = this.jwtTokenService.createToken(payload, secret, expiresIn);

    await this.setCurrentRefreshToken(token, username);

    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.jwtConfig.getJwtRefreshExpirationTime()}`;

    return cookie;
  }

  async validateUserForLocalStrategy(username: string, pass: string) {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      return null;
    }

    const match = await this.bcryptService.compare(pass, user.password);

    if (user && match) {
      await this.updateLoginTime(user.username);
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUserForJWTStrategy(username: string) {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      return null;
    }

    return user;
  }

  async updateLoginTime(username: string) {
    await this.userRepository.updateLastLogin(username);
  }

  async setCurrentRefreshToken(refreshToken: string, username: string) {
    const currentHashedRefreshToken = await this.bcryptService.hash(
      refreshToken
    );

    await this.userRepository.updateRefreshToken(
      username,
      currentHashedRefreshToken
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      return null;
    }

    const isRefreshTokenMatching = await this.bcryptService.compare(
      refreshToken,
      user.hashRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }
}
