import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { Produto } from "@prisma/client";
import { AuthGuard } from "src/guards/auth.guard";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@UseGuards(AuthGuard)
@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiBody({ type: CreateProductDTO })
  @ApiResponse({ status: 200, description: "Produto criado com sucesso!" })
  @ApiResponse({
    status: 402,
    description: "Erro, produto informado já existe!",
  })
  @ApiResponse({ status: 501, description: "Erro ao criar produto: " })
  async create(@Body() createProductDto: CreateProductDTO): Promise<Produto> {
    return this.productsService.create(createProductDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get product by ID" })
  @ApiParam({ name: "id", description: "Product ID", type: Number })
  @ApiResponse({ status: 200, description: "Objeto do tipo Product" })
  @ApiResponse({ status: 404, description: "Produto não encontrado!" })
  @ApiResponse({
    status: 505,
    description: "Erro ao obter a lista de produtos: ",
  })
  async findOne(@Param("id") id: number): Promise<Produto> {
    return this.productsService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({ status: 200, description: "Lista de objetos do tipo Product" })
  @ApiResponse({ status: 201, description: "Nenhum produto encontrado!" })
  @ApiResponse({
    status: 505,
    description: "Erro ao obter a lista de produtos: ",
  })
  async findAll(): Promise<Produto[]> {
    return this.productsService.getAll();
  }

  @Put(":id")
  @ApiOperation({ summary: "Update product by ID" })
  @ApiParam({ name: "id", description: "Product ID", type: Number })
  @ApiBody({ type: UpdateProductDTO })
  @ApiResponse({ status: 200, description: "Produto atualizado com sucesso!" })
  @ApiResponse({ status: 404, description: "Produto não encontrado!" })
  @ApiResponse({ status: 502, description: "Erro ao atualizar produto: " })
  async update(
    @Param("id") id: number,
    @Body() updateProductDto: UpdateProductDTO,
  ): Promise<Produto> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete product by ID" })
  @ApiParam({ name: "id", description: "Product ID", type: Number })
  @ApiResponse({ status: 200, description: "Produto excluído com sucesso!" })
  @ApiResponse({ status: 404, description: "Produto não encontrado!" })
  @ApiResponse({ status: 503, description: "Erro ao excluir produto: " })
  async remove(@Param("id") id: number): Promise<Produto> {
    return this.productsService.delete(id);
  }
}
