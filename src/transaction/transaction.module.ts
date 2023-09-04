import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { EtherscanModule } from '../etherscan/etherscan.module';
import { TransactionsEntity } from './entities/transactions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [EtherscanModule, TypeOrmModule.forFeature([TransactionsEntity])],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
