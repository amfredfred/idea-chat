import { IPumpCoin } from "../../common/types";

export interface TokenSwapState {
    tokenA: IPumpCoin | undefined;
    tokenB: IPumpCoin | undefined;
    amountToSwap: number;
    loading: boolean;
    error: string | null;
    tokensList:IPumpCoin[],
    isVisible: boolean
}

export const tokenSwapInitialState: TokenSwapState = {
    tokenA: undefined,
    tokenB: undefined,
    amountToSwap: 0,
    loading: false,
    error: null,
    tokensList: [],
    isVisible: true
};

export const initialStates = {
    tokenSwapInitialState
}