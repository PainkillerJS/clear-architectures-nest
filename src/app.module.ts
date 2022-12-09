import { Module } from "@nestjs/common";
import { EnvironmentConfigModule } from "./infrastructure/config/environment-config/environment-config.module";
import { ConfigModule } from "@nestjs/config";
import { TypeormModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';

@Module({
  imports: [ConfigModule.forRoot(), EnvironmentConfigModule, TypeormModule, LoggerModule, ExceptionsModule, RepositoriesModule],
})
export class AppModule {}
