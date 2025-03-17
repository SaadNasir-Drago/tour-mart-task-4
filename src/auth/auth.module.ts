import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { UsersModule } from "../users/users.module"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { LocalStrategy } from "./strategies/local.strategy"
import { WsJwtGuard } from "./guards/ws-jwt.guard"

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET", "supersecret"),
        signOptions: { expiresIn: "1d" },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, WsJwtGuard],
  controllers: [AuthController],
  exports: [AuthService, WsJwtGuard],
})
export class AuthModule {}

