import { Controller, Get } from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('max')
  public getMax() {
    return this.transactionService.getMax();
  }
}
