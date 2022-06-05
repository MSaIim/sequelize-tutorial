import { Module } from '@nestjs/common';
import { ServerController } from './controllers/server.controller';

@Module({
  controllers: [ServerController]
})
export class ServerModule {}
