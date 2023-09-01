import { Injectable } from '@nestjs/common';
import { TransactionsService } from '../../transactions/services/transactions.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CronJobService {
  constructor(private readonly transactionService: TransactionsService) {}

  @Cron('0 * * * * *')
  public updateTransactionsCron() {
    return this.transactionService.update();
  }
}
