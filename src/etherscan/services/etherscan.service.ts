import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Utils } from '../../common/utils/utils';
import { EtherscanTransactionResponseInterface } from '../interfaces/etherscan.transaction-response.interface';
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

  public get<T>(
    endpoint: string,
    query?: Record<string, string>,
  ): Promise<EtherscanCommonResponseInterface<T>> {
    let addr = this.baseUrl + '/' + endpoint;

    if (query) {
      addr += '?' + Utils.convertQueryParams(query);
    }

    return fetch(addr, {
      ...this.fetchOptions,
    }).then((res) => res.json());
  }

  public getLastBlockNumber() {
    return this.get<EtherscanTransactionResponseInterface>('api', {
      module: 'proxy',
      action: 'eth_blockNumber',
    });
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
