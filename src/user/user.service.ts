import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create({ name, email, password, phone, city }: CreateUserDTO) {
    this.prisma.appUser.create({
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
