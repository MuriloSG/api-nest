import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDTO } from "./dto/create-product.dto";
import { UpdateProductDTO } from "./dto/update-product.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Produto } from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    name,
    price,
    categoriaId,
  }: CreateProductDTO): Promise<Produto> {
    const product = await this.prisma.produto.create({
      data: {
        name,
        price,
        categoriaId,
        createdAt: new Date(),
      },
      include: {
        categoria: true,
      },
    });

    return product;
  }

  async getAll(): Promise<Produto[]> {
    return this.prisma.produto.findMany({
      include: {
        categoria: true,
      },
    });
  }

  async getById(id: number): Promise<Produto> {
    const id_product = Number(id);
    const product = await this.prisma.produto.findUnique({
      where: { id: id_product },
      include: {
        categoria: true,
      },
    });

    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return product;
  }

  async update(id: number, updateData: UpdateProductDTO): Promise<Produto> {
    const id_product = Number(id);
    const productExists = await this.prisma.produto.findUnique({
      where: { id: id_product },
    });

    if (!productExists) {
      throw new NotFoundException("Product not found");
    }

    const product = await this.prisma.produto.update({
      where: { id: id_product },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        categoria: true,
      },
    });

    return product;
  }

  async delete(id: number): Promise<Produto> {
    const id_product = Number(id);
    const productExists = await this.prisma.produto.findUnique({
      where: { id: id_product },
    });

    if (!productExists) {
      throw new NotFoundException("Product not found");
    }

    return this.prisma.produto.delete({
      where: { id: id_product },
      include: {
        categoria: true,
      },
    });
  }
}
