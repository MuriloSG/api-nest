import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";

@Controller("users")
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return { body };
  }

  @Get()
  async getAll() {
    return { users: [] };
  }

  @Get(":id")
  async getById(@Param() param) {
    return { user: {}, param };
  }

  @Put(":id")
  async updateAll(@Param() param, @Body() body) {
    return {
      param,
      body,
    };
  }

  @Patch(":id")
  async updatePartial(@Param() param, @Body() body) {
    return {
      param,
      body,
    };
  }

  @Delete(":id")
  async delete(@Param() param) {
    return {
      param,
    };
  }
}
