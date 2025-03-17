import { Injectable } from "@nestjs/common"
import { OnEvent } from "@nestjs/event-emitter"
import { NotificationsService } from "../notifications.service"
import { NotificationsGateway } from "../notifications.gateway"
import { UsersService } from "../../users/users.service"
import { PostCreatedEvent } from "../../posts/events/post-created.event"

@Injectable()
export class NotificationsListener {
  constructor(
    private notificationsService: NotificationsService,
    private notificationsGateway: NotificationsGateway,
    private usersService: UsersService,
  ) {}

  @OnEvent("post.created")
  async handlePostCreatedEvent(event: PostCreatedEvent) {
    const { post } = event
    const author = post.author

    // Get all followers of the post author
    const followers = await this.usersService.getFollowers(author.id)

    if (followers.length === 0) {
      return
    }

    // Create notifications for all followers
    const notificationsToCreate = followers.map((follower) => ({
      userId: follower.id,
      message: `User ${author.username} has created a new post titled "${post.title}"`,
    }))

    // Save notifications to database
    const savedNotifications = await this.notificationsService.createMany(notificationsToCreate)

    // Send real-time notifications to connected users
    savedNotifications.forEach((notification) => {
      this.notificationsGateway.sendNotificationToUser(notification.userId, notification)
    })
  }
}

