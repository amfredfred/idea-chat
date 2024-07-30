import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { initialStates, NativeToken } from "../initial-states"
import { promise } from "../../../utils";


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

const fetchTokenRate = createAsyncThunk('', async () => {
    await promise(30)
    throw new Error("HELLO WORLD");
})


const tokenSwapSlice = createSlice({
    name: 'token_swap_slice',
    initialState: initialStates['tokenSwapInitialState'],
    reducers: {
        setBalance: (state, action) => {
            const { token, balance } = action.payload;
            (state as any)[token].balance = balance;
        },
        setAmountToReceive: (state, action) => {
            state.amountToReceive = action.payload;
        },
        setAmountToSend: (state, action) => {
            state.amountToSend = action.payload;
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
    extraReducers(builder) {
        builder.addCase(fetchTokenRate.fulfilled, (state, { payload }) => {
            state.isFetchingRate = false
            state.isFetchingRateError = false
            console.log({ payload })
        }).addCase(fetchTokenRate.pending, (state, action) => {
            state.isFetchingRate = true
            state.isFetchingRateError = false
            console.log(action.payload)
        }).addCase(fetchTokenRate.rejected, (state, { payload, error }) => {
            state.isFetchingRate = false
            state.isFetchingRateError = true
            console.log({ payload, error })
        })
    },
});

export const {
    setBalance,
    setAmountToSend,
    setAmountToReceive,
    setSelectedtokenToSend,
    setSelectedtokenToReceive,
    setLoading,
    setError,
    setIsVisible,
    setTokensList,
} = tokenSwapSlice.actions;

export default tokenSwapSlice.reducer;