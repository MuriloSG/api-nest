/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AppUser } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  private issuer = "Api nest js";
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken(user: AppUser) {
    return {
      accessToken: this.jwtService.sign(
        {
          sub: user.id,
        },
        {
          expiresIn: "1 days",
          issuer: this.issuer,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
      });

      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.appUser.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException("Incorrect email and/or password");
    }

    return this.createToken(user);
  }

  async forgot(email: string) {
    const userExists = await this.prisma.appUser.findFirst({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new UnauthorizedException("Incorrect email and/or password");
    }

    // TO DO: send email...
    return true;
  }

  async reset(password: string, token: string) {
    // TO DO: validar o token e depois trocar a senha.

    const id = 0;
    const user = await this.prisma.appUser.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(body: AuthRegisterDTO) {
    const user = await this.userService.create(body);
    return this.createToken(user);
  }
}
