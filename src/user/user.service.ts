import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { AppUser } from "@prisma/client";
import { UpdatePartialUserDTO } from "./dto/updatePartial-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    name,
    email,
    password,
    phone,
    city,
    role,
  }: CreateUserDTO): Promise<AppUser> {
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const userExits = await this.prisma.appUser.findUnique({
      where: {
        email,
      },
    });

    if (userExits) {
      throw new ConflictException("Email is already in use");
    }

    const user = await this.prisma.appUser.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        city,
        role,
      },
    });

    return user;
  }

  async getAll(): Promise<AppUser[]> {
    return this.prisma.appUser.findMany();
  }

  async getById(id: number): Promise<AppUser> {
    const userExists = await this.prisma.appUser.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        phone: true,
        city: true,
        role: true,
        createdAt: true,
        updateAt: true,
      },
    });
    if (!userExists) {
      throw new NotFoundException("User not found");
    }

    return userExists as AppUser;
  }

  async update(id: number, updateData: UpdatePartialUserDTO): Promise<AppUser> {
    const userExists = await this.prisma.appUser.findUnique({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new NotFoundException("User not found");
    }

    if (updateData.phone && updateData.phone !== userExists.phone) {
      const phoneInUse = await this.prisma.appUser.findFirst({
        where: {
          phone: updateData.phone,
          id: { not: id }, // Isso exclui o proprio usuario da busca, Garantia
        },
      });

      if (phoneInUse) {
        throw new ConflictException(
          `Phone number ${updateData.phone} is already in use`,
        );
      }
    }

    const user = await this.prisma.appUser.update({
      where: {
        id,
      },
      data: updateData,
    });
    return user;
  }

  async delete(id: number): Promise<AppUser> {
    return this.prisma.appUser.delete({
      where: {
        id,
      },
    });
  }
}
