import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDTO {
  @ApiProperty({
    example: "Notebook Dell Inspiron",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1999.99,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  categoriaId?: number;
}
