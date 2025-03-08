import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { NotificationsService } from "./notifications.service"
import { NotificationsController } from "./notifications.controller"
import { NotificationsGateway } from "./notifications.gateway"
import { Notification } from "./entities/notification.entity"
import { UsersModule } from "../users/users.module"
import { AuthModule } from "../auth/auth.module"
import { NotificationsListener } from "./listeners/notifications.listener"
import { EventEmitterModule } from "@nestjs/event-emitter"

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UsersModule, AuthModule, EventEmitterModule.forRoot(),],
  providers: [NotificationsService, NotificationsGateway, NotificationsListener],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}

