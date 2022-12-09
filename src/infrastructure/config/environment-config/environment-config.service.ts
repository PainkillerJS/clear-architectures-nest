import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { DatabaseConfigType } from "../../../domain/config/database.config";

@Injectable()
export class EnvironmentConfigService implements DatabaseConfigType {
  constructor(private configService: ConfigService) {}

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
