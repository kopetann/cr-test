import { EtherscanCommonResponseInterface } from './etherscan.common-response.interface';

export interface TransactionResponseInterface {
  hash: string;
  nonce: string;
  blockHash: string;
  blockNumber: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  type: string;
  gas: string;
  gasPrice: string;
  input: string;
  v: string;
  r: string;
  s: string;
}

export interface EtherscanTransactionResponseInterface {
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactionsRoot: string;
  transactions: TransactionResponseInterface[];
  uncles: string[];
}

export type EtherscanTransactionResponseInterfaceType =
  EtherscanCommonResponseInterface<EtherscanTransactionResponseInterface>;
