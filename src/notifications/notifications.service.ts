import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { Notification } from "./entities/notification.entity"
import { CreateNotificationDto } from "./dto/create-notification.dto"

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async findAll(userId: string, onlyUnread = false): Promise<Notification[]> {
    const query = this.notificationsRepository
      .createQueryBuilder("notification")
      .where("notification.userId = :userId", { userId })
      .orderBy("notification.createdAt", "DESC")

    if (onlyUnread) {
      query.andWhere("notification.isRead = :isRead", { isRead: false })
    }

    return query.getMany()
  }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationsRepository.create(createNotificationDto)
    return this.notificationsRepository.save(notification)
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: { id, userId },
    })

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`)
    }

    notification.isRead = true
    return this.notificationsRepository.save(notification)
  }

  async createMany(notifications: CreateNotificationDto[]): Promise<Notification[]> {
    const notificationEntities = this.notificationsRepository.create(notifications)
    return this.notificationsRepository.save(notificationEntities)
  }
}

  