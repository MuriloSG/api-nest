import { IsString, Matches } from "class-validator";

export class UpdatePartialUserDTO {
  @IsString()
  name: string;

  @Matches(/^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/, {
    message: "Invalid phone number",
  })
  phone: string;

  @IsString()
  city: string;
}
