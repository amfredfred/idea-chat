import { createSlice } from "@reduxjs/toolkit"
import { initialStates, NativeToken } from "../initial-states"


const handleTokenSelection = (state: typeof initialStates['tokenSwapInitialState'], action: any, tokenKey: 'tokenA' | 'tokenB') => {
    if (action?.payload?.symbol?.toUpperCase?.() === 'SOL') {
        if (state[tokenKey]?.symbol?.toUpperCase?.() == 'SOL') {
            state[tokenKey === 'tokenA' ? 'tokenB' : 'tokenA'] = action.payload;
            state[tokenKey] = NativeToken as any;
        }
    } else {
        state[tokenKey] = action.payload;
        state[tokenKey === 'tokenA' ? 'tokenB' : 'tokenA'] = NativeToken as any;
    }
    state.isVisible = true;
};


const tokenSwapSlice = createSlice({
    name: 'token_swap',
    initialState: initialStates['tokenSwapInitialState'],
    reducers: {
        setBalance: (state, action) => {
            const { token, balance } = action.payload;
            state[token].balance = balance;
        },
        setAmountToSwap: (state, action) => {
            state.amountToSwap = action.payload;
        },
        setSelectedTokenA: (state, action) => {
            handleTokenSelection(state, action, 'tokenA');
        },
        setSelectedTokenB: (state, action) => {
            handleTokenSelection(state, action, 'tokenB');
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setIsVisible: (state, action) => {
            state.isVisible = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setTokensList: (state, action) => {
            if (!state.tokenA) state.tokenA = NativeToken as any
            if (!state.tokenB) state.tokenB = action.payload?.[0]
            state.tokensList = action.payload
        },
    },
});

export const {
    setBalance,
    setAmountToSwap,
    setSelectedTokenA,
    setSelectedTokenB,
    setLoading,
    setError,
    setIsVisible,
    setTokensList
} = tokenSwapSlice.actions;

export default tokenSwapSlice.reducer;