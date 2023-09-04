import { Module } from '@nestjs/common';
import { CronJobModule } from './cron-job/cron-job.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './common/database/database.config';
import { TransactionModule } from './transaction/transaction.module';
import { EtherscanModule } from './etherscan/etherscan.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
      inject: [ConfigService],
    }),
    CronJobModule,
    TransactionModule,
    EtherscanModule,
  ],
})
export class AppModule {}
