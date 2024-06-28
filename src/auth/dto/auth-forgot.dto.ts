import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class AuthForgotDTO {
  @ApiProperty({
    example: "Paulo Souza",
  })
  @IsEmail()
  email: string;
}
