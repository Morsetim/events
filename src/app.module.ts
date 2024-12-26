import { Module } from '@nestjs/common';
import { ABiService } from './abi.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, ABiService],
})
export class AppModule {}
