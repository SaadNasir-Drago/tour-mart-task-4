import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { UsersService } from "../users/users.service"
import { LoginDto } from "./dto/login.dto"
import { RegisterDto } from "./dto/register.dto"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    if (user && (await user.validatePassword(password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)
    if (!user) {
      throw new UnauthorizedException("Invalid credentials")
    }

    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto)
    const payload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user,
    }
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch (e) {
      throw new UnauthorizedException("Invalid token")
    }
  }
}

