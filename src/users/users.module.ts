import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { User } from "./entities/user.entity"
import { UserFollows } from "./entities/user-follows.entity"

@Module({
  imports: [TypeOrmModule.forFeature([User, UserFollows])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

