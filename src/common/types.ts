export type IPumpToken = {
  name: string;
  marketCap: number;
  marketTradingVolume: number;
  holdersCount: number;
  tradingVolume: number;
  devStatus: string;
  twitter: string;
  telegram: string;
  website: string;
  address: string;
  created_timestamp: number;
  logo: string;
  progress: number;
  decimals: number;
  symbol: string;
}

export type IPumpTokenChartDetail = IPumpToken & {
  description: string;
  price: number;
  totalSupply: number

  volume1h: number
  volume1m: number
  volume5m: number
  volume6h: number
  volume24h: number
}

export type IFilterTypes = {
  min: number | null;
  max: number | null;
  name: 'holders' | 'liquidity' | 'volume' | 'marketCap' | 'devHolding'; // General names
  type: 'number' | 'percentage';
}

export type IPumpRequestParams = {
  filter_listing: Array<IFilterTypes>;
  filter_migrated: Array<IFilterTypes>;
};

export type PumpSocketSend = {
  requestPumpList: 'requestPumpList';
  requestPumpDetails: 'requestPumpDetails';
  userJoined: { userId: string; userName: string };
}

export type PumpSocketReceived = {
  pumpList: {
    pump: IPumpToken[],
    migrated: IPumpToken[]
  };
}

export type SocketEventCallback<T = any> = (data: T) => void;

import { Socket } from 'socket.io-client';

export type UseSocketReturn<T = any> = {
  socket: Socket | null;
  connected: boolean;
  emitEvent: (event: string, data?: any) => void;
  onEvent: (event: string, callback: SocketEventCallback<T>) => () => void;
}

export type ITokenSwapInputProps = {
  side: 'receive' | 'pay';
  onChange: (value: number | string) => void;
  selectedToken: IPumpToken | undefined;
  onTokenSelect: (token: IPumpToken) => void;
  amount?: string;
  readonly?: boolean
  value: number | string
  loading?: boolean
}

export type IChatStates = "DEN" | "PUMP.RAY" | "ALPHA"