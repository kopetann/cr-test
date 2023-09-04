import { Injectable, Logger } from '@nestjs/common';
import { EtherscanService } from '../../etherscan/services/etherscan.service';
import { EtherscanTransactionResponseInterfaceType } from '../../etherscan/interfaces/etherscan.transaction-response.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionsEntity } from '../entities/transactions.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  private readonly logger: Logger = new Logger(TransactionsService.name);

  constructor(
    @InjectRepository(TransactionsEntity)
    private readonly transactionsRepository: Repository<TransactionsEntity>,
    private readonly etherscanService: EtherscanService,
  ) {}

  update(blockId: number) {
    this.logger.debug('Updating transactions');
    return this.etherscanService
      .getTransactionByBlockId(blockId)
      .then((res: EtherscanTransactionResponseInterfaceType) => {
        console.log(res);
        if (res.result.transactions.length) {
          this.logger.debug('Transactions were updated');
        }
      });
  }

  public getByTransactionId(
    transactionId: string,
  ): Promise<TransactionsEntity[]> {
    return this.transactionsRepository.find();
  }
}
