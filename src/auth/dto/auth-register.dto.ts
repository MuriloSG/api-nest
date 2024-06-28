import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword, Matches } from "class-validator";

export class AuthRegisterDTO {
  @ApiProperty({
    example: "Paulo Souza",
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "paulo@teste.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "Paulo123",
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  password: string;

  @ApiProperty({
    example: "38999887766",
  })
  @Matches(/^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/, {
    message: "Invalid phone number",
  })
  phone: string;

  @ApiProperty({
    example: "Salinas-MG",
  })
  @IsString()
  city: string;
}
