import { createSlice } from "@reduxjs/toolkit"
import { initialStates } from "../initial-states"


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
            state.tokenA = action.payload;
            state.tokensList = [action.payload]
            state.isVisible = true
        },
        setSelectedTokenB: (state, action) => {
            state.tokenB = action.payload;
            state.tokensList = [action.payload]
            state.isVisible = true
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
    },
});

export const {
    setBalance,
    setAmountToSwap,
    setSelectedTokenA,
    setSelectedTokenB,
    setLoading,
    setError,
    setIsVisible
} = tokenSwapSlice.actions;

export default tokenSwapSlice.reducer;