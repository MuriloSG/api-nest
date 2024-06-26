import { IsOptional, IsString, Matches } from "class-validator";

export class UpdatePartialUserDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Matches(/^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/, {
    message: "Invalid phone number",
  })
  phone?: string;

  @IsOptional()
  @IsString()
  city?: string;
}
