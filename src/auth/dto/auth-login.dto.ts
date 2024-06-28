import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthLoginDTO {
  @ApiProperty({
    example: "Paulo Souza",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Paulo123",
  })
  @IsString()
  @MinLength(6)
  password: string;
}
