import { IsNotEmpty, MinLength } from "class-validator"

export class CreatePostDto {
  @IsNotEmpty()
  @MinLength(3)
  title: string

  @IsNotEmpty()
  @MinLength(10)
  content: string
}

