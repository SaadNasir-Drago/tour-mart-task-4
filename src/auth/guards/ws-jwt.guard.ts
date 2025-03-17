import { Injectable, type CanActivate, type ExecutionContext } from "@nestjs/common"
import type { Observable } from "rxjs"
import { AuthService } from "../auth.service"
import { WsException } from "@nestjs/websockets"

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient()
    const token = this.extractTokenFromHeader(client.handshake.headers.authorization)

    if (!token) {
      throw new WsException("Unauthorized")
    }

    try {
      const payload = this.authService.verifyToken(token)
      client.user = payload
      return true
    } catch (e) {
      throw new WsException("Unauthorized")
    }
  }

  private extractTokenFromHeader(authorization: string): string | undefined {
    if (!authorization) return undefined
    const [type, token] = authorization.split(" ")
    return type === "Bearer" ? token : undefined
  }
}

//auth