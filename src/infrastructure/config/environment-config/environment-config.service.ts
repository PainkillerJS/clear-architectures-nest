import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { DatabaseConfigType } from "../../../domain/config/database.config";
import type { JWTConfigType } from "../../../domain/config/jwt.config";

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfigType, JWTConfigType
{
  constructor(private readonly configService: ConfigService) {}

  getJwtSecret(): string {
    return this.configService.get<string>("JWT_SECRET");
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>("JWT_EXPIRATION_TIME");
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET");
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>("JWT_REFRESH_TOKEN_EXPIRATION_TIME");
  }

  getDatabaseHost() {
    return this.configService.get<string>("DATABASE_HOST");
  }

  getDatabasePort() {
    return this.configService.get<number>("DATABASE_PORT");
  }

  getDatabaseUser() {
    return this.configService.get<string>("DATABASE_USER");
  }

  getDatabasePassword() {
    return this.configService.get<string>("DATABASE_PASSWORD");
  }

  getDatabaseName() {
    return this.configService.get<string>("DATABASE_NAME");
  }

  getDatabaseSchema() {
    return this.configService.get<string>("DATABASE_SCHEMA");
  }

  getDatabaseSync() {
    return this.configService.get<boolean>("DATABASE_SYNCHRONIZE");
  }
}
