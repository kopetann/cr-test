export interface EtherscanCommonResponseInterface<T> {
  jsonrpc: string;
  id: number;
  result: T;
}
