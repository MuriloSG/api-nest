import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsString, MinLength } from "class-validator";

export class AuthResetDTO {
  @ApiProperty({
    example: "Paulo123",
  })
  @IsString()
  @MinLength(6)
  password: string;

  @IsJWT()
  token: string;
}
