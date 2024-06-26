import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { AppUser } from "@prisma/client";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    name,
    email,
    password,
    phone,
    city,
  }: CreateUserDTO): Promise<AppUser> {
    return this.prisma.appUser.create({
      data: {
        name,
        email,
        password,
        phone,
        city,
      },
    });
  }

  async getAll(): Promise<AppUser[]> {
    return this.prisma.appUser.findMany();
  }

  async getById(id: number): Promise<AppUser> {
    const userExists = await this.prisma.appUser.findUnique({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new NotFoundException("User not found");
    }

    return userExists;
  }
}
