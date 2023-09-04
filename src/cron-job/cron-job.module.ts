import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './services/cron-job.service';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [ScheduleModule.forRoot(), TransactionModule],
  providers: [CronJobService],
  exports: [CronJobService],
})
export class CronJobModule {}
