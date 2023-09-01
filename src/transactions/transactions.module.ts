import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { EtherscanModule } from '../etherscan/etherscan.module';

@Module({
  imports: [EtherscanModule],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
