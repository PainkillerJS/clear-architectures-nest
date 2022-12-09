import type { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EnvironmentConfigService } from "../../environment-config/environment-config.service";

export const typeormConfig = async (
  config: EnvironmentConfigService
): Promise<TypeOrmModuleOptions> => ({
  type: "postgres",
  host: config.getDatabaseHost(),
  port: config.getDatabasePort(),
  username: config.getDatabaseUser(),
  password: config.getDatabasePassword(),
  database: config.getDatabaseName(),
  autoLoadEntities: true,
  synchronize: false,
  schema: config.getDatabaseSchema(),
  ssl: {
    rejectUnauthorized: false,
  },
});
