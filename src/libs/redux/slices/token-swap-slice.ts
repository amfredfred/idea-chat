import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { initialStates, NativeToken, FetchTokenRateParams, TokenRate, QuoteSwapPrams } from "../initial-states"
import axios from "axios";


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


export const fetchTokenRate = createAsyncThunk(
    'token/fetchRate',
    async ({ fromMint, toMint }: FetchTokenRateParams, thunkAPI) => {
        try {
            if (!fromMint) return thunkAPI.rejectWithValue({ error: "Invalid from address" })
            if (!toMint) return thunkAPI.rejectWithValue({ error: "Invalid to address" })
            console.log('Fetching token rate with params:', { fromMint, toMint });
            const response = await axios.get<{ data: { [key: string]: TokenRate } }>(`https://price.jup.ag/v6/price?ids=${fromMint}&vsToken=${toMint}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch token rate:', error);
            return thunkAPI.rejectWithValue({ error: (error as Error).message });
        }
    }
);

export const fetchQuoteSwap = createAsyncThunk(
    'token/fetchQuoteSwap',
    async ({ fromMint, toMint, amount }: QuoteSwapPrams, thunkAPI) => {
        try {
            if (!fromMint) return thunkAPI.rejectWithValue({ error: "Invalid from address" })
            if (!toMint) return thunkAPI.rejectWithValue({ error: "Invalid to address" })
            const url = new URL('https://quote-api.jup.ag/v6/quote');
            url.searchParams.append('inputMint', fromMint);
            url.searchParams.append('outputMint', toMint);
            url.searchParams.append('amount', String(amount));
            // url.searchParams.append('slippageBps', '1');
            // url.searchParams.append('platformFeeBps', '1');
            console.log(url.toString(), amount)
            const response = await axios.get<{ data: { [key: string]: TokenRate } }>(`https://price.jup.ag/v6/price?ids=${fromMint}&vsToken=${toMint}`);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch token rate:', error);
            return thunkAPI.rejectWithValue({ error: (error as Error).message });
        }
    }
);


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
            state.conversionRate = payload?.data[state.tokenToSend?.address as string].price
        }).addCase(fetchTokenRate.pending, (state,) => {
            state.isFetchingRate = true
            state.isFetchingRateError = false
        }).addCase(fetchTokenRate.rejected, (state, { payload, error }) => {
            state.isFetchingRate = false
            state.isFetchingRateError = true
            state.error = error?.message || 'Failed to fetch token rate';
            console.log({ payload, error })
        });

        builder.addCase(fetchQuoteSwap.fulfilled, (state, { payload }) => {
            state.isFetchingQuoteSwap = false
            state.isFetchingQuoteSwapError = false
            console.log({ payload })
            // state.quoteResponse = payload?.data[state.tokenToSend?.address as string].price
        }).addCase(fetchQuoteSwap.pending, (state,) => {
            state.isFetchingQuoteSwap = true
            state.isFetchingQuoteSwapError = false
        }).addCase(fetchQuoteSwap.rejected, (state, { payload, error }) => {
            state.isFetchingQuoteSwap = false
            state.isFetchingQuoteSwapError = true
            state.error = error?.message || 'Failed to fetch token rate';
            console.log({ payload, error })
        });
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