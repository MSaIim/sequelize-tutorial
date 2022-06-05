import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { PATH_CLIENT } from '../utils/constants';

@Controller()
export class ServerController {
  private clientIndexPath = join(PATH_CLIENT, 'index.html');

  @Get('/*')
  root(@Req() request: Request, @Res() response: Response) {
    const indexExists = existsSync(this.clientIndexPath);

    if (indexExists) {
      const sourceDocument = readFileSync(this.clientIndexPath, 'utf-8').toString();
      response.status(HttpStatus.OK).send(sourceDocument);
    } else {
      response.status(HttpStatus.NOT_FOUND).send('Not found');
    }
  }
}
