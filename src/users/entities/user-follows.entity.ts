import { Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class UserFollows {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(
    () => User,
    (user) => user.following,
  )
  @JoinColumn({ name: "follower_id" })
  follower: User

  @ManyToOne(
    () => User,
    (user) => user.followers,
  )
  @JoinColumn({ name: "following_id" })
  following: User

  @CreateDateColumn()
  createdAt: Date
}

