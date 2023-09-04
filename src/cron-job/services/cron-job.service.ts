import { Injectable } from '@nestjs/common';
import { TransactionService } from '../../transaction/services/transaction.service';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CronJobService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly configService: ConfigService,
  ) {}

  @Cron('0 * * * * *')
  public updateTransactionsCron() {
    return this.transactionService.update();
  }
}
