import { Injectable } from "@nestjs/common";
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
}
