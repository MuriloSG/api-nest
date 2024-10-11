import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDTO } from "./dto/create-category.dto";
import { UpdateCategoryDTO } from "./dto/update-category.dto"; // Certifique-se de que este DTO exista
import { PrismaService } from "src/prisma/prisma.service";
import { Categoria } from "@prisma/client";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ nome }: CreateCategoryDTO): Promise<Categoria> {
    const category = await this.prisma.categoria.create({
      data: {
        nome,
      },
    });

    return category;
  }

  async getAll(): Promise<Categoria[]> {
    return this.prisma.categoria.findMany();
  }

  async getById(id: number): Promise<Categoria> {
    const id_categoria = Number(id);
    const category = await this.prisma.categoria.findUnique({
      where: { id: id_categoria },
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    return category;
  }

  async update(id: number, updateData: UpdateCategoryDTO): Promise<Categoria> {
    const id_categoria = Number(id);
    const categoryExists = await this.prisma.categoria.findUnique({
      where: { id: id_categoria },
    });

    if (!categoryExists) {
      throw new NotFoundException("Category not found");
    }

    const category = await this.prisma.categoria.update({
      where: { id: id_categoria },
      data: updateData,
    });

    return category;
  }

  async delete(id: number): Promise<Categoria> {
    const id_categoria = Number(id);
    const categoryExists = await this.prisma.categoria.findUnique({
      where: { id: id_categoria },
    });

    if (!categoryExists) {
      throw new NotFoundException("Category not found");
    }

    return this.prisma.categoria.delete({
      where: { id: id_categoria },
    });
  }
}
