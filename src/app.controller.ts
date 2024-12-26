import { AppService } from './app.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('event')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('transfers')
  async getTransferEvents(@Query('fromBlock') fromBlock: number = 0, @Query('toBlock') toBlock: string = 'latest') {
    return await this.appService.getTransferEvents(fromBlock, toBlock);
  }

  @Get('mints')
  async getMintEvents(@Query('fromBlock') fromBlock: number = 0, @Query('toBlock') toBlock: number = 0) {
    return await this.appService.getMintEvents(fromBlock, toBlock);
  }

  @Get('creation-tx')
  async getContractCreationTx() {
    return await this.appService.getContractCreationTx();
  }
}
