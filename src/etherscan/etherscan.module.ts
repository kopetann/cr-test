import { Module } from '@nestjs/common';
import { EtherscanService } from './services/etherscan.service';

@Module({
  providers: [EtherscanService],
  exports: [EtherscanService],
})
export class EtherscanModule {}
