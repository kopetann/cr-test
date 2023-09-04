import { Module } from '@nestjs/common';
import { TransactionService } from './services/transaction.service';
import { EtherscanModule } from '../etherscan/etherscan.module';
import { TransactionEntity } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from './controllers/transaction.controller';

@Module({
  imports: [EtherscanModule, TypeOrmModule.forFeature([TransactionEntity])],
  controllers: [TransactionsController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
