import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateProductDTO {
  @ApiProperty({
    example: "Notebook Dell Inspiron",
  })
  @IsString()
  name: string;
}
