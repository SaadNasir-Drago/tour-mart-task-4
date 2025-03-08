import { IsNotEmpty, IsUUID } from "class-validator"

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string

  @IsNotEmpty()
  message: string
}

