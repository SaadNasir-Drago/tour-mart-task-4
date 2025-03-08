import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PostsService } from "./posts.service"
import { PostsController } from "./posts.controller"
import { Post } from "./entities/post.entity"
import { UsersModule } from "../users/users.module"
import { EventEmitterModule } from "@nestjs/event-emitter"

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule, EventEmitterModule.forRoot()],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}

