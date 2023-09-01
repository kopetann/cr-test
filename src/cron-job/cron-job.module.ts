import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './services/cron-job.service';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [ScheduleModule.forRoot(), TransactionsModule],
  providers: [CronJobService],
  exports: [CronJobService],
})
export class CronJobModule {}
