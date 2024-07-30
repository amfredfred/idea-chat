import { IPumpCoin } from "../../common/types";
import SolanaLogo from '../../assets/solana-sol-logo.png'

export interface TokenSwapState {
    tokenToSend: IPumpCoin | undefined;
    tokenToReceive: IPumpCoin | undefined;
    amountToSend: number;
    amountToReceive: number;
    loading: boolean;
    error: string | null;
    tokensList: IPumpCoin[],
    isVisible: boolean
}

export const NativeToken = {
    symbol: 'SOL',
    logo: SolanaLogo
}

export const tokenSwapInitialState: TokenSwapState = {
    tokenToSend: undefined,
    tokenToReceive: undefined,
    amountToSend: 0,

    amountToReceive: 0, loading: false,
    error: null,
    tokensList: [],
    isVisible: true
};

export const initialStates = {
    tokenSwapInitialState
}