import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: `95eb73e4d15d9fc5c0ac68e18b834fe9e8329420`,
    }),
    forwardRef(() => UserModule), // resolvendo problema de dependencia circular, comum no nest
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
