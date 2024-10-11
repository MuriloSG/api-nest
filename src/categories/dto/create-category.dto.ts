import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDTO {
  @ApiProperty({
    example: "Eletrônicos",
  })
  @IsString()
  @IsNotEmpty()
  nome: string;
}
