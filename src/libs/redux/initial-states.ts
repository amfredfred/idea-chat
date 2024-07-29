import { IPumpCoin } from "../../common/types";

export interface TokenSwapState {
    tokenA: IPumpCoin | undefined;
    tokenB: IPumpCoin | undefined;
    amountToSwap: number;
    selectedTokenA: string | null;
    selectedTokenB: string | null;
    loading: boolean;
    error: string | null;
    isVisible: boolean
}

export const tokenSwapInitialState: TokenSwapState = {
    tokenA: undefined,
    tokenB: undefined,
    amountToSwap: 0,
    selectedTokenA: null,
    selectedTokenB: null,
    loading: false,
    error: null,
    isVisible: true
};

export const initialStates = {
    tokenSwapInitialState
}