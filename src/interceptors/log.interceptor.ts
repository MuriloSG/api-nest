import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LogsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();
    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        console.log(`URL: ${request.url}`);
        console.log(`METHOD: ${request.method}`);
        console.log(`A execução levou: ${Date.now() - dt} milisegundos.`);
      }),
    );
  }
}
