import {
  WebSocketGateway,
  WebSocketServer,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  SubscribeMessage,
  WsException,
} from "@nestjs/websockets"
import { UseGuards } from "@nestjs/common"
import type { Server, Socket } from "socket.io"
import { WsJwtGuard } from "../auth/guards/ws-jwt.guard"
import type { Notification } from "./entities/notification.entity"
import { ThrottlerGuard } from "@nestjs/throttler"

// Define an extended Socket interface that includes the user property
interface AuthenticatedSocket extends Socket {
  user: {
    sub: string;
    [key: string]: any; // Add any other user properties that might be present
  };
}

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private connectedClients: Map<string, AuthenticatedSocket> = new Map()

  @UseGuards(WsJwtGuard, ThrottlerGuard)
  async handleConnection(client: AuthenticatedSocket) {
    try {
      const userId = client.user.sub
      this.connectedClients.set(userId, client)
      client.join(`user-${userId}`)
      console.log(`Client connected: ${userId}`)
    } catch (error) {
      throw new WsException("Unauthorized")
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    try {
      const userId = client.user.sub
      this.connectedClients.delete(userId)
      console.log(`Client disconnected: ${userId}`)
    } catch (error) {
      console.log("Client disconnected (unauthorized)")
    }
  }

  sendNotificationToUser(userId: string, notification: Notification) {
    this.server.to(`user-${userId}`).emit("notification", notification)
  }

  @SubscribeMessage("markAsRead")
  @UseGuards(WsJwtGuard)
  handleMarkAsRead(client: AuthenticatedSocket, notificationId: string) {
    // This is handled by the controller, but we could implement it here as well
    return { event: "markAsRead", data: { success: true, id: notificationId } }
  }
}