import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm"
import * as bcrypt from "bcrypt"
import { Post } from "../../posts/entities/post.entity"
import { Notification } from "../../notifications/entities/notification.entity"
import { UserFollows } from "./user-follows.entity"
import { Exclude } from "class-transformer"

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  @Exclude()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(
    () => Post,
    (post) => post.author,
  )
  posts: Post[]

  @OneToMany(
    () => Notification,
    (notification) => notification.user,
  )
  notifications: Notification[]

  @OneToMany(
    () => UserFollows,
    (userFollows) => userFollows.follower,
  )
  following: UserFollows[]

  @OneToMany(
    () => UserFollows,
    (userFollows) => userFollows.following,
  )
  followers: UserFollows[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }
}

