import { Controller, Get, Post, Body, Param, UseGuards, Request } from "@nestjs/common"
import  { PostsService } from "./posts.service"
import type { CreatePostDto } from "./dto/create-post.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user.id, createPostDto)
  }

  @Get('user/:userId')
  findByAuthor(@Param('userId') userId: string) {
    return this.postsService.findByAuthor(userId);
  }
}

