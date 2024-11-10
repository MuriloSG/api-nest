import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ParamId = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    console.log("teste");
    return Number(context.switchToHttp().getRequest().params.id);
  },
);
