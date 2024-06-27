import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePartialUserDTO } from "./dto/updatePartial-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorator";

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
  async getById(@ParamId() id: number) {
    return this.userService.getById(id);
  }

  @Patch(":id")
  async update(
    @ParamId() id: number,
    @Body() updateData: UpdatePartialUserDTO,
  ) {
    return this.userService.update(id, updateData);
  }

  @Delete(":id")
  async delete(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
