import { createSlice } from "@reduxjs/toolkit"
import { initialStates, NativeToken } from "../initial-states"


const handleTokenSelection = (state: typeof initialStates['tokenSwapInitialState'], action: any, tokenKey: 'tokenToSend' | 'tokenToReceive') => {
    if (action?.payload?.symbol?.toUpperCase?.() === 'SOL') {
        if (state[tokenKey]?.symbol?.toUpperCase?.() == 'SOL') {
            state[tokenKey === 'tokenToSend' ? 'tokenToReceive' : 'tokenToSend'] = action.payload;
            state[tokenKey] = NativeToken as any;
        }
    } else {
        state[tokenKey] = action.payload;
        state[tokenKey === 'tokenToSend' ? 'tokenToReceive' : 'tokenToSend'] = NativeToken as any;
    }
    state.isVisible = true;
};


const tokenSwapSlice = createSlice({
    name: 'token_swap',
    initialState: initialStates['tokenSwapInitialState'],
    reducers: {
        setBalance: (state, action) => {
            const { token, balance } = action.payload;
            (state as any)[token].balance = balance;
        },
        setAmountToSwap: (state, action) => {
            state.amountToSwap = action.payload;
        },
        setSelectedtokenToSend: (state, action) => {
            handleTokenSelection(state, action, 'tokenToSend');
        },
        setSelectedtokenToReceive: (state, action) => {
            handleTokenSelection(state, action, 'tokenToReceive');
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
            if (!state.tokenToSend) state.tokenToSend = NativeToken as any
            if (!state.tokenToReceive) state.tokenToReceive = action.payload?.[0]
            state.tokensList = action.payload
        },
    },
});

export const {
    setBalance,
    setAmountToSwap,
    setSelectedtokenToSend,
    setSelectedtokenToReceive,
    setLoading,
    setError,
    setIsVisible,
    setTokensList
} = tokenSwapSlice.actions;

export default tokenSwapSlice.reducer;