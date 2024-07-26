export interface IPumpCoin {
  address: string
  associated_bonding_curve: string
  base_reserve: number
  bonding_curve: string
  complete: number
  created_timestamp: number
  creator: string
  creator_balance: number
  creator_close: boolean
  creator_token_balance: string
  description: string
  holder_count: number
  id: number
  image_uri: string
  king_of_the_hill_timestamp: number
  koth_duration: number
  last_reply: number
  last_trade_timestamp: number
  logo: string
  market_cap: number
  market_cap_1m: string
  market_cap_5m: string
  market_id: number
  message_id: number
  message_sent: number
  metadata_uri: string
  name: string
  open_timestamp: number
  price: number
  price_change_percent1m: number
  price_change_percent5m: number
  progress: number
  quote_reserve: number
  raydium_pool: string
  reply_count: number
  status: number
  swaps_1h: number
  swaps_1m: number
  swaps_5m: number
  swaps_6h: number
  swaps_24h: number
  symbol: string
  telegram: string
  time_since_koth: number
  total_supply: string
  twitter: string
  updated_at: number
  usd_market_cap: string
  virtual_sol_reserves: string
  virtual_token_reserves: string
  volume_1h: number
  volume_1m: number
  volume_5m: number
  volume_6h: number
  volume_24h: number
  website: string
}

export interface IPumpCoinMigrated {
  account: string;
  decimals: number;
  supply: string;
  mintAuthority: string;
  tokenStandard: string;
  updateAuthority: string;
  address: string;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  primarySaleHappened: boolean;
  isMutable: boolean;
  createdOn: string;
  description: string;
  logo: string;
  showName: boolean;
  telegram: string;
  twitter: string;
  website?: string;
  reply_count: number
  usd_market_cap: number
  holder_count: number
  total_supply: number
  progress: number
}

export interface IPumpRequestParams {
  filter_listing: Record<string, string>,
  filter_migrated: Record<string, string>
}

export interface PumpDetail {
  address: string
  burn_ratio: string
  burn_status: string // "burn"
  creator_percentage: string
  top_10_holder_rate: number
  holder_rugged_num?: number
  holder_token_num?: number
}


export interface PumpSocketSend {
  requestPumpList: 'requestPumpList';
  requestPumpDetails: 'requestPumpDetails';
  userJoined: { userId: string; userName: string };
}

export interface PumpSocketReceived {
  pumpList: {
    pump: IPumpCoin[],
    migrated: IPumpCoinMigrated[]
  };
}

export type SocketEventCallback<T = any> = (data: T) => void;

import { Socket } from 'socket.io-client';

export interface UseSocketReturn<T = any> {
  socket: Socket | null;
  connected: boolean;
  emitEvent: (event: string, data?: any) => void;
  onEvent: (event: string, callback: SocketEventCallback<T>) => () => void;
}
