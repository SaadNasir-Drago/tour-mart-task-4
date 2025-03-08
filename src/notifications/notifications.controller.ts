import { Controller, Get, Patch, Param, UseGuards, Request, Query } from "@nestjs/common"
import  { NotificationsService } from "./notifications.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@Controller("notifications")
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  findAll(@Request() req, @Query('unread') unread: string) {
    const onlyUnread = unread === "true"
    return this.notificationsService.findAll(req.user.id, onlyUnread)
  }

  @Patch(":id/read")
  markAsRead(@Request() req, @Param('id') id: string) {
    return this.notificationsService.markAsRead(id, req.user.id)
  }
}

