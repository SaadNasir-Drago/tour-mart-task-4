import { Injectable, ConflictException, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import { UserFollows } from "./entities/user-follows.entity"
import type { RegisterDto } from "../auth/dto/register.dto"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserFollows)
    private userFollowsRepository: Repository<UserFollows>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`)
    }
    return user
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const { email, username } = registerDto

    // Check if user with email or username already exists
    const existingUser = await this.usersRepository.findOne({
      where: [{ email }, { username }],
    })

    if (existingUser) {
      throw new ConflictException("Email or username already exists")
    }

    const user = this.usersRepository.create(registerDto)
    return this.usersRepository.save(user)
  }

  async followUser(followerId: string, followingId: string): Promise<void> {
    // Check if users exist
    await this.findOne(followerId)
    await this.findOne(followingId)

    // Check if already following
    const existingFollow = await this.userFollowsRepository.findOne({
      where: {
        follower: { id: followerId },
        following: { id: followingId },
      },
      relations: ["follower", "following"],
    })

    if (existingFollow) {
      throw new ConflictException("Already following this user")
    }

    // Create follow relationship
    const userFollow = this.userFollowsRepository.create({
      follower: { id: followerId },
      following: { id: followingId },
    })

    await this.userFollowsRepository.save(userFollow)
  }

  async unfollowUser(followerId: string, followingId: string): Promise<void> {
    const follow = await this.userFollowsRepository.findOne({
      where: {
        follower: { id: followerId },
        following: { id: followingId },
      },
      relations: ["follower", "following"],
    })

    if (!follow) {
      throw new NotFoundException("Follow relationship not found")
    }

    await this.userFollowsRepository.remove(follow)
  }

  async getFollowers(userId: string): Promise<User[]> {
    const follows = await this.userFollowsRepository.find({
      where: { following: { id: userId } },
      relations: ["follower"],
    })

    return follows.map((follow) => follow.follower)
  }

  async getFollowing(userId: string): Promise<User[]> {
    const follows = await this.userFollowsRepository.find({
      where: { follower: { id: userId } },
      relations: ["following"],
    })

    return follows.map((follow) => follow.following)
  }
}

