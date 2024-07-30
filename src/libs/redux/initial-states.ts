import { IPumpCoin } from "../../common/types";
import SolanaLogo from '../../assets/solana-sol-logo.png'

export interface IApp {
    isInitLoading: boolean,
    isLoading: boolean,
}

export interface TokenSwapState {
    tokenToSend: IPumpCoin | undefined;
    tokenToReceive: IPumpCoin | undefined;
    amountToSend: number;
    amountToReceive: number;
    loading: boolean;
    error: string | null;
    tokensList: IPumpCoin[],
    isVisible: boolean
    isFetchingRate: boolean
    isFetchingRateError: boolean
    conversionRate: number | null
}

export const NativeToken = {
    symbol: 'SOL',
    logo: SolanaLogo
}

export const appInitialState: IApp = {
    isInitLoading: false,
    isLoading: false
}

export const tokenSwapInitialState: TokenSwapState = {
    tokenToSend: undefined,
    tokenToReceive: undefined,
    amountToSend: 0,
    amountToReceive: 0, loading: false,
    error: null,
    tokensList: [],
    isVisible: true,
    isFetchingRate: false,
    isFetchingRateError: false,
    conversionRate: null
};

export const initialStates = {
    tokenSwapInitialState,
    appInitialState
}