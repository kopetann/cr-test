import { Module } from '@nestjs/common';
import { CronJobModule } from './cron-job/cron-job.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CronJobModule, UserModule],
})
export class AppModule {}
