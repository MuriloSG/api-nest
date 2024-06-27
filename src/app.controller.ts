import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Raiz")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Get a welcome message" })
  @ApiResponse({
    status: 200,
    description: "Welcome message returned successfully",
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
