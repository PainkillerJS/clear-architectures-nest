import { Module } from "@nestjs/common";
import { EnvironmentConfigModule } from "./infrastructure/config/environment-config/environment-config.module";
import { ConfigModule } from "@nestjs/config";
import { TypeormModule } from "./infrastructure/config/typeorm/typeorm.module";
import { LoggerModule } from "./infrastructure/logger/logger.module";
import { ExceptionsModule } from "./infrastructure/exceptions/exceptions.module";
import { RepositoriesModule } from "./infrastructure/repositories/repositories.module";
import { BcryptModule } from "./infrastructure/services/bcrypt/bcrypt.module";
import { JwtModule } from "./infrastructure/services/jwt/jwt.module";
import { LocalStrategy } from "./infrastructure/common/strategies/local.strategy";
import { JwtStrategy } from "./infrastructure/common/strategies/jwt.strategy";
import { JwtRefreshTokenStrategy } from "./infrastructure/common/strategies/jwtRefresh.strategy";

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvironmentConfigModule,
    TypeormModule,
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    BcryptModule,
    JwtModule,
  ],
  providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
