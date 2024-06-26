import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePartialUserDTO } from "./dto/updatePartial-user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() { name, email, password, phone, city }: CreateUserDTO) {
    return this.userService.create({
      name,
      email,
      password,
      phone,
      city,
    });
  }

  @Get()
  async getAll() {
    return this.userService.getAll();
  }

  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id) {
    return { user: {}, id };
  }

  @Patch(":id")
  async updatePartial(
    @Param("id", ParseIntPipe) id,
    @Body() { name, phone, city }: UpdatePartialUserDTO,
  ) {
    return {
      name,
      phone,
      city,
    };
  }

  @Delete(":id")
  async delete(@Param("id", ParseIntPipe) id) {
    return {
      id,
    };
  }
}
