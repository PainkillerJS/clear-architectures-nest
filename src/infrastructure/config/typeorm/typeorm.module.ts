import { Module } from "@nestjs/common";
import { EnvironmentConfigModule } from "../environment-config/environment-config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EnvironmentConfigService } from "../environment-config/environment-config.service";
import { typeormConfig } from "./config/typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: typeormConfig,
    }),
  ],
})
export class TypeormModule {}
