import { Injectable, Logger } from '@nestjs/common';
import { EtherscanService } from '../../etherscan/services/etherscan.service';

@Injectable()
export class TransactionsService {
  private readonly logger: Logger = new Logger(TransactionsService.name);

  constructor(private readonly etherscanService: EtherscanService) {}

  update() {
    this.etherscanService;
    this.logger.debug('Updating transactions');
  }
}
