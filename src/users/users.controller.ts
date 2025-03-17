import { Controller, Get, Post, Delete, Param, UseGuards, Request } from "@nestjs/common"
import  { UsersService } from "./users.service"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post("follow/:id")
  async followUser(@Request() req, @Param('id') followingId: string) {
    await this.usersService.followUser(req.user.id, followingId)
    return { message: "Successfully followed user" }
  }

  @UseGuards(JwtAuthGuard)
  @Delete("follow/:id")
  async unfollowUser(@Request() req, @Param('id') followingId: string) {
    await this.usersService.unfollowUser(req.user.id, followingId)
    return { message: "Successfully unfollowed user" }
  }

  @UseGuards(JwtAuthGuard)
  @Get('followers')
  async getFollowers(@Request() req) {
    return this.usersService.getFollowers(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('following')
  async getFollowing(@Request() req) {
    return this.usersService.getFollowing(req.user.id);
  }
}

