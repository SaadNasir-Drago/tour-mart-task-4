import type { Post } from "../entities/post.entity"

export class PostCreatedEvent {
  constructor(public readonly post: Post) {}
}

