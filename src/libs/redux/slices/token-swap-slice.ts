import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { Buffer } from 'buffer';
import { toast } from "react-toastify";
import {
    initialStates,
    NativeToken,
    FetchTokenRateParams,
    TokenRate,
    QuoteSwapPrams,
    QuoteSwapResponse,
    TokenRequesSwapPrams,
    TokenSwapResponse,
} from "../initial-states";
import { parseEther } from "../../../utils";

const handleTokenSelection = (
    state: typeof initialStates['tokenSwapInitialState'],
    action: any,
    tokenKey: 'tokenToSend' | 'tokenToReceive'
) => {
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
            if (!fromMint) return thunkAPI.rejectWithValue({ error: "Invalid from address" });
            if (!toMint) return thunkAPI.rejectWithValue({ error: "Invalid to address" });
            const response = await axios.get<{ data: { [key: string]: TokenRate } }>(`https://price.jup.ag/v6/price?ids=${fromMint}&vsToken=${toMint}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: (error as Error).message });
        }
    }
);

export const fetchQuoteSwap = createAsyncThunk(
    'token/fetchQuoteSwap',
    async ({ fromMint, toMint, amount, settings }: QuoteSwapPrams, thunkAPI) => {
        try {
            if (!fromMint) return thunkAPI.rejectWithValue({ error: "Invalid from address" });
            if (!toMint) return thunkAPI.rejectWithValue({ error: "Invalid to address" });
            const url = new URL('https://quote-api.jup.ag/v6/quote');
            url.searchParams.append('inputMint', fromMint);
            url.searchParams.append('outputMint', toMint);
            url.searchParams.append('amount', String(amount));
            url.searchParams.append('slippageBps', settings.slippageBps);
            url.searchParams.append('platformFeeBps', import.meta.env.VITE_FEE_BP);
            const response = await axios.get<QuoteSwapResponse>(url.toString());
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: (error as Error).message });
        }
    }
);

export const handleTokenSwap = createAsyncThunk(
    'token/handleTokenSwap',
    async ({ quoteResponse, connection, wallet }: TokenRequesSwapPrams, thunkAPI) => {
        try {
            const FEE_ACCOUNT = import.meta.env.VITE_FEE_ACCOUNT;
            const [feeAccount] = PublicKey.findProgramAddressSync(
                [
                    Buffer.from('referral_ata'),
                    new PublicKey(FEE_ACCOUNT).toBuffer(),
                    new PublicKey(NativeToken.address).toBuffer(),
                ],
                new PublicKey('REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3')
            );

            const response = await fetch('https://quote-api.jup.ag/v6/swap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    quoteResponse,
                    userPublicKey: wallet.publicKey?.toString(),
                    feeAccount: feeAccount.toString(),
                }),
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            const { swapTransaction } = await response.json();
            if (!swapTransaction) {
                throw new Error('Invalid swap transaction response');
            }

            const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
            const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

            const latestBlockHash = await connection.getLatestBlockhash();
            const signedTransaction = await wallet.signTransaction?.(transaction);

            if (!signedTransaction) {
                throw new Error('Transaction signing failed');
            }

            const deSerializedTransaction = signedTransaction.serialize();
            const txid = await connection.sendRawTransaction(deSerializedTransaction, {
                skipPreflight: true,
                maxRetries: 2,
            });

            const confirmTransaction = connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: txid,
            });

            toast.promise(confirmTransaction, {
                pending: 'Transaction is being processed...',
                success: 'Transaction confirmed!',
                error: 'Transaction failed!',
            });

            await confirmTransaction;

            const tokenSwapResponse: TokenSwapResponse = {
                sol_scan: `https://solscan.io/tx/${txid}`,
            };

            return tokenSwapResponse;
        } catch (error) {
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
            if (!state.tokenToSend) state.tokenToSend = NativeToken as any;
            if (!state.tokenToReceive) state.tokenToReceive = action.payload?.[0];
            state.tokensList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTokenRate.fulfilled, (state, { payload }) => {
                state.fetchTokenRateState = 'success';
                state.fetchTokenRateMessage = 'success';
                state.conversionRate = payload?.data[state.tokenToSend?.address as string].price;
            })
            .addCase(fetchTokenRate.pending, (state) => {
                state.fetchTokenRateState = 'pending';
                state.fetchTokenRateMessage = 'pending';
            })
            .addCase(fetchTokenRate.rejected, (state, { payload }) => {
                state.fetchTokenRateState = 'error';
                state.fetchTokenRateMessage = 'error';
                state.error = (payload as any)?.error || 'Failed to fetch token rate';
            })
            .addCase(fetchQuoteSwap.fulfilled, (state, { payload }) => {
                state.fetchQuoteState = 'success';
                state.fetchQuoteMessage = 'success';
                state.quoteResponse = payload;
                state.amountToReceive = parseEther(Number(payload.outAmount), Number(state.tokenToReceive?.decimals));
            })
            .addCase(fetchQuoteSwap.pending, (state) => {
                state.fetchQuoteState = 'pending';
                state.fetchQuoteMessage = 'pending';
            })
            .addCase(fetchQuoteSwap.rejected, (state, { payload }) => {
                state.fetchQuoteState = 'error';
                state.fetchQuoteMessage = (payload as any)?.error || 'Failed to fetch token rate';
            })
            .addCase(handleTokenSwap.fulfilled, (state, { payload }) => {
                state.tokenSwapState = 'success';
                state.tokenSwapMessage = 'success';
                state.tokenSwapResponse = payload;
            })
            .addCase(handleTokenSwap.pending, (state) => {
                state.tokenSwapState = 'pending';
                state.tokenSwapMessage = 'pending';
                console.log('PENDING TRANSACTION');
            })
            .addCase(handleTokenSwap.rejected, (state, { payload }) => {
                state.tokenSwapState = 'error';
                state.tokenSwapMessage = 'error';
                state.error = (payload as any)?.error || 'Failed to fetch token rate';
            });
    }
});

export const {
    setBalance,
    setAmountToReceive,
    setAmountToSend,
    setSelectedtokenToSend,
    setSelectedtokenToReceive,
    setLoading,
    setIsVisible,
    setError,
    setTokensList
} = tokenSwapSlice.actions;

export default tokenSwapSlice.reducer;
