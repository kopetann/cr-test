import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TransactionsService {
  private readonly logger: Logger = new Logger(TransactionsService.name);

  update() {
    this.logger.debug('Updating transactions');
  }
}
