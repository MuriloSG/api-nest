import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    console.log(authorization);
    try {
      const data = this.authService.checkToken(
        (authorization ?? "").split(" ")[1],
      );
      request.tokenPayload = data;
      return true;
    } catch (error) {
      return false;
    }
  }
}
