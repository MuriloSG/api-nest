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
import { CategoriesService } from "./category.service";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDTO } from "./dto/update-category.dto";
import { Categoria } from "@prisma/client";
import { AuthGuard } from "src/guards/auth.guard";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@UseGuards(AuthGuard)
@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({ summary: "Create a new category" })
  @ApiBody({ type: CreateCategoryDTO })
  @ApiResponse({ status: 200, description: "Categoria criada com sucesso!" })
  @ApiResponse({
    status: 402,
    description: "Erro ao criar categoria: ",
  })
  async create(
    @Body() createCategoryDto: CreateCategoryDTO,
  ): Promise<Categoria> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get category by ID" })
  @ApiParam({ name: "id", description: "Category ID", type: Number })
  @ApiResponse({ status: 200, description: "Objeto do tipo Categoria" })
  @ApiResponse({ status: 404, description: "Categoria não encontrada!" })
  async findOne(@Param("id") id: number): Promise<Categoria> {
    return this.categoriesService.getById(id);
  }

  @Get()
  @ApiOperation({ summary: "Get all categories" })
  @ApiResponse({
    status: 200,
    description: "Lista de objetos do tipo Categoria",
  })
  async findAll(): Promise<Categoria[]> {
    return this.categoriesService.getAll();
  }

  @Put(":id")
  @ApiOperation({ summary: "Update category by ID" })
  @ApiParam({ name: "id", description: "Category ID", type: Number })
  @ApiBody({ type: UpdateCategoryDTO }) // Certifique-se de que este DTO exista
  @ApiResponse({
    status: 200,
    description: "Categoria atualizada com sucesso!",
  })
  @ApiResponse({ status: 404, description: "Categoria não encontrada!" })
  async update(
    @Param("id") id: number,
    @Body() updateCategoryDto: UpdateCategoryDTO,
  ): Promise<Categoria> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete category by ID" })
  @ApiParam({ name: "id", description: "Category ID", type: Number })
  @ApiResponse({ status: 200, description: "Categoria excluída com sucesso!" })
  @ApiResponse({ status: 404, description: "Categoria não encontrada!" })
  async remove(@Param("id") id: number): Promise<Categoria> {
    return this.categoriesService.delete(id);
  }
}
