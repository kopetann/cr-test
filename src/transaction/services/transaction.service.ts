import { Injectable, Logger } from '@nestjs/common';
import { EtherscanService } from '../../etherscan/services/etherscan.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionService {
  private readonly logger: Logger = new Logger(TransactionService.name);

  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
    private readonly etherscanService: EtherscanService,
    private readonly configService: ConfigService,
  ) {}

  async update() {
    const blockId = await this.getNextBlockId();
    this.logger.debug('Updating transactions...');

    const transactions =
      await this.etherscanService.getTransactionsByBlockId(blockId);

    if (!transactions) {
      this.logger.warn(`Transactions of block ${blockId} weren't updated`);
    }

    try {
      for (const transaction of transactions) {
        await this.createTransaction(
          blockId,
          transaction.from,
          transaction.to,
          Number.parseInt(transaction.value, 16),
        );
        this.logger.debug(`Transaction ${transaction.hash} were updated`);
      }
    } catch (e) {
      this.logger.warn(
        `Some of transactions of block ${blockId} weren't updated`,
      );
    }
  }

  public async getMax() {
    const queryBuilder =
      this.transactionsRepository.createQueryBuilder('transaction');
    return queryBuilder
      .select('value')
      .orderBy('value', 'DESC')
      .limit(100)
      .getOne();
  }

  private async getNextBlockId(): Promise<number> {
    let block = await this.transactionsRepository.maximum('value');

    if (!block) {
      block = this.configService.get<number>('BLOCK_START_ID', 17583000);
    } else {
      block++;
    }

    return block;
  }

  private createTransaction(
    blockId: number,
    from: string,
    to: string,
    value: number,
  ) {
    return this.transactionsRepository.save({
      blockId,
      from,
      to,
      value,
    });
  }
}
