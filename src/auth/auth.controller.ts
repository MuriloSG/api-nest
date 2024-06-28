/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgotDTO } from "./dto/auth-forgot.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "src/decorators/user.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("login")
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post("register")
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post("forgot")
  async forgot(@Body() { email }: AuthForgotDTO) {
    return this.authService.forgot(email);
  }

  @Post("reset")
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post("me")
  async me(@User() user) {
    return { user };
  }
}
