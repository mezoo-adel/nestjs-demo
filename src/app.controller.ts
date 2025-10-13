import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Query('id') id: string, @Query('name') name: string) {
    return { id, name };
  }

  @Patch(':app')
  update(@Param('app') app: string, @Body() body: object) {
    return { app, body };
  }
}
