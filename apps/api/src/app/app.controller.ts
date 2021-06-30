import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/mosteiros')
  async getData(@Res() res: Response) {
    try {
      const mosteiros = await this.appService.allMosteiros();
      res.status(200).json({ mosteiros });
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  }
}
