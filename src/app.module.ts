import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { ThrottlerModule } from "@nestjs/throttler"
import { UsersModule } from "./users/users.module"
import { PostsModule } from "./posts/posts.module"
import { NotificationsModule } from "./notifications/notifications.module"
import { AuthModule } from "./auth/auth.module"
import { User } from "./users/entities/user.entity"
import { Post } from "./posts/entities/post.entity"
import { Notification } from "./notifications/entities/notification.entity"
import { UserFollows } from "./users/entities/user-follows.entity"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST", "localhost"),
        port: configService.get("DB_PORT", 5432),
        username: configService.get("DB_USERNAME", "postgres"),
        password: configService.get("DB_PASSWORD", "postgres"),
        database: configService.get("DB_DATABASE", "notification_system"),
        entities: [User, Post, Notification, UserFollows],
        synchronize: configService.get("NODE_ENV") !== "production",
      }),
    }),
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    UsersModule,
    PostsModule,
    NotificationsModule,
    AuthModule,
  ],
})
export class AppModule {}

