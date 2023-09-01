import { Module } from '@nestjs/common';
import { EtherscanService } from './services/etherscan.service';

@Module({
  imports: [EtherscanService],
  exports: [EtherscanService],
})
export class EtherscanModule {}
