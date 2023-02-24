export interface CurrencyData {
  base_ccy: string;
  buy: string;
  ccy: string;
  sale: string;
}

export interface CurrencyState {
  currencies: CurrencyData[];
  loading: boolean;
  error: null | Error;
}

export enum CurrencyExchangeType {
  BUY = 'BUY',
  SALE = 'SALE'
}