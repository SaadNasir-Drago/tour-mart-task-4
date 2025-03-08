import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm"
import { User } from "../../users/entities/user.entity"

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  title: string

  @Column("text")
  content: string

  @ManyToOne(
    () => User,
    (user) => user.posts,
  )
  @JoinColumn({ name: "author_id" })
  author: User

  @Column({ name: "author_id" })
  authorId: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

