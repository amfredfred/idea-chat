import { IPumpCoinMigrated } from "../../common/types";
import SolanaLogo from '../../assets/solana-sol-logo.png'
import { Connection } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";

export interface IApp {
    isInitLoading: boolean,
    isLoading: boolean,
}

export interface SwapInfo {
    ammKey: string;
    label: string;
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    feeAmount: string;
    feeMint: string;
}

export interface RoutePlan {
    swapInfo: SwapInfo;
    percent: number;
}

export interface QuoteSwapResponse {
    inputMint: string;
    inAmount: string;
    outputMint: string;
    outAmount: string;
    otherAmountThreshold: string;
    swapMode: string;
    slippageBps: number;
    platformFee: {
        amount: string,
        feeBps: number
    };
    priceImpactPct: string;
    routePlan: RoutePlan[];
    contextSlot: number;
    timeTaken: number;
}

export interface TokenRate {
    id: string;
    mintSymbol: string;
    vsToken: string;
    vsTokenSymbol: string;
    price: number;
}
export interface FetchTokenRateParams {
    fromMint?: string;
    toMint?: string;
}
export interface QuoteSwapPrams {
    fromMint?: string;
    toMint?: string;
    settings: ISwapSettings,
    amount: number
}

export interface TokenRequesSwapPrams {
    quoteResponse: QuoteSwapResponse
    connection: Connection,
    wallet: WalletContextState
}

export interface TokenSwapResponse {
    sol_scan: string | null
}

export interface ISwapSettings {
    slippageBps: string
}


export interface TokenSwapState {
    tokenToSend: IPumpCoinMigrated | undefined;
    tokenToReceive: IPumpCoinMigrated | undefined;
    amountToSend: number;
    amountToReceive: number;
    loading: boolean;
    error: string | null;
    tokensList: IPumpCoinMigrated[],
    isVisible: boolean

    fetchTokenRateState: 'error' | 'success' | 'pending' | 'idle'
    fetchTokenRateMessage: string | null
    conversionRate: number | null

    fetchQuoteState: 'error' | 'success' | 'pending' | 'idle'
    fetchQuoteMessage: string | null
    quoteResponse: QuoteSwapResponse
    settings: ISwapSettings

    tokenSwapState: 'error' | 'success' | 'pending' | 'idle',
    tokenSwapMessage: string | null,
    tokenSwapResponse: TokenSwapResponse
}

export const NativeToken = {
    symbol: 'SOL',
    logo: SolanaLogo,
    address: 'So11111111111111111111111111111111111111112',
    mint: 'So11111111111111111111111111111111111111112',
    decimals: 9
}

export const appInitialState: IApp = {
    isInitLoading: false,
    isLoading: false
}

export const tokenSwapInitialState: TokenSwapState = {
    tokenToSend: undefined,
    tokenToReceive: undefined,
    amountToSend: 0.0001,
    amountToReceive: 0, loading: false,
    error: null,
    tokensList: [],
    isVisible: false,
    fetchTokenRateState: 'idle',
    fetchTokenRateMessage: null,
    conversionRate: null,
    fetchQuoteState: 'idle',
    fetchQuoteMessage: null,
    quoteResponse: {} as any,
    settings: {
        slippageBps: '300'
    },

    tokenSwapState: 'idle',
    tokenSwapMessage: null,
    tokenSwapResponse: {
        sol_scan: null
    }
};

export const initialStates = {
    tokenSwapInitialState,
    appInitialState
}