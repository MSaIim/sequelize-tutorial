import { AddressInfo, Server } from 'net';
import { json, urlencoded } from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as expressStaticGzip from 'express-static-gzip';
import { PATH_CLIENT } from './utils/constants';
import { ServerModule } from './server.module';

/****************************************/
/* Constants
/****************************************/
const pkg = require('../package.json');

// Regular constants
const PATH_APP_ROUTE = '/app';
const PATH_ASSETS_ROUTE = '/assets';

/****************************************/
/* Setup NestJS
/****************************************/
async function bootstrap(): Promise<Server> {
  const app = await NestFactory.create<NestExpressApplication>(ServerModule);

  // Setup static routes
  app.use(PATH_APP_ROUTE, expressStaticGzip(PATH_CLIENT, { index: false, enableBrotli: false }));
  app.use(PATH_ASSETS_ROUTE, expressStaticGzip(join(PATH_CLIENT, PATH_ASSETS_ROUTE), { index: false, enableBrotli: false }));

  // Setup middlewares
  app.use(urlencoded({ extended: false }));
  app.use(json());

  // Start node server
  await app.listen(8080);
  const httpServer = await app.getHttpServer();
  const serverAddressInfo = (await httpServer.address()) as AddressInfo;

  console.log(`${pkg.name}@${pkg.version} is listening on ${serverAddressInfo.address}:${serverAddressInfo.port}`);

  return httpServer;
}

/****************************************/
/* Bootstrap and start server
/****************************************/
bootstrap().catch((err) => console.error(err));
