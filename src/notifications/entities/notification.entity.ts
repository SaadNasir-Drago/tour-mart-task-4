import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm"
import { User } from "../../users/entities/user.entity"

@Entity()
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(
    () => User,
    (user) => user.notifications,
  )
  @JoinColumn({ name: "user_id" })
  user: User

  @Column({ name: "user_id" })
  userId: string

  @Column("text")
  message: string

  @Column({ default: false })
  isRead: boolean

  @CreateDateColumn()
  createdAt: Date
}

