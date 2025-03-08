import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { EventEmitter2 } from "@nestjs/event-emitter"
import { Post } from "./entities/post.entity"
import type { CreatePostDto } from "./dto/create-post.dto"
import { PostCreatedEvent } from "./events/post-created.event"

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private eventEmitter: EventEmitter2,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ["author"],
      order: { createdAt: "DESC" },
    })
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ["author"],
    })

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`)
    }

    return post
  }

  async create(userId: string, createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create({
      ...createPostDto,
      authorId: userId,
    })

    const savedPost = await this.postsRepository.save(post)

    // Emit post created event
    const postWithAuthor = await this.postsRepository.findOne({
      where: { id: savedPost.id },
      relations: ["author"],
    })

    if (postWithAuthor) {
      this.eventEmitter.emit("post.created", new PostCreatedEvent(postWithAuthor))
    }

    return savedPost
  }

  async findByAuthor(authorId: string): Promise<Post[]> {
    return this.postsRepository.find({
      where: { authorId },
      relations: ["author"],
      order: { createdAt: "DESC" },
    })
  }
}

