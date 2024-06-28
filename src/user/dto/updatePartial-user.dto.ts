import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, Matches } from "class-validator";
import { Role } from "src/enums/role.enum";

export class UpdatePartialUserDTO {
  @ApiProperty({
    example: "Paulo Souza",
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: "38999887766",
  })
  @IsOptional()
  @Matches(/^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/, {
    message: "Invalid phone number",
  })
  phone?: string;

  @ApiProperty({
    example: "Salinas-MG",
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    example: "1 para Admin, 2 para User",
  })
  @IsOptional()
  @IsEnum(Role)
  role?: number;
}
