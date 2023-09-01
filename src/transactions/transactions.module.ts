import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';

@Module({
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
