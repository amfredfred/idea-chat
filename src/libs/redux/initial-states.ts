export interface TokenState {
    symbol: string;
    balance: number;
}

export interface TokenSwapState {
    tokenA: TokenState;
    tokenB: TokenState;
    amountToSwap: number;
    selectedTokenA: string | null;
    selectedTokenB: string | null;
    loading: boolean;
    error: string | null;
    isVisible: boolean
}

export const tokenSwapInitialState: TokenSwapState = {
    tokenA: {
        symbol: 'TOKEN_A',
        balance: 0,
    },
    tokenB: {
        symbol: 'TOKEN_B',
        balance: 0,
    },
    amountToSwap: 0,
    selectedTokenA: null,
    selectedTokenB: null,
    loading: false,
    error: null,
    isVisible: false
};

export const initialStates = {
    tokenSwapInitialState
}