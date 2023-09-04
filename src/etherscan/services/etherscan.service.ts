import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Utils } from '../../common/utils/utils';
import {
  EtherscanTransactionResponseInterface,
  TransactionResponseInterface,
} from '../interfaces/etherscan.transaction-response.interface';
import { EtherscanCommonResponseInterface } from '../interfaces/etherscan.common-response.interface';

@Injectable()
export class EtherscanService {
  protected readonly fetchOptions: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
  };
  protected baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = configService.get<string>('ETHERSCAN_API_URL');
    this.checkConnection();
  }

  public getLastBlockNumber() {
    return this.get<EtherscanTransactionResponseInterface>('api', {
      module: 'proxy',
      action: 'eth_blockNumber',
    });
  }

  public async getTransactionsByBlockId(
    blockId: number,
  ): Promise<TransactionResponseInterface[]> {
    const tag = '0x' + Number(blockId).toString(16);
    const res = await this.get<EtherscanTransactionResponseInterface>('api', {
      module: 'proxy',
      action: 'eth_getBlockByNumber',
      tag,
      boolean: 'true',
    });

    if (!res.result || !res.result.transactions) return [];

    return res.result.transactions;
  }

  private async get<T>(
    endpoint: string,
    query?: Record<string, string>,
  ): Promise<EtherscanCommonResponseInterface<T>> {
    let addr = this.baseUrl + '/' + endpoint;

    if (query) {
      addr += '?' + Utils.convertQueryParams(query);
    }

    const res = await fetch(addr, {
      ...this.fetchOptions,
    });
    return await res.json();
  }

  private checkConnection() {
    this.get(
      'api?module=proxy&action=eth_getBlockByNumber&tag=0x10d4f&boolean=true',
    ).catch(() => {
      throw new InternalServerErrorException(
        `Etherscan address is not available`,
      );
    });
  }
}
