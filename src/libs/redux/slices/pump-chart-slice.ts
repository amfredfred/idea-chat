import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface HistoricalDataPoint {
    timestamp: number;
    value: number;
}

interface PumpChartState {
    data: HistoricalDataPoint[];
    status: 'idle' | 'pending' | 'error' | 'success'
    message: string | null,
    isPumpChartShown: boolean
}

const initialState: PumpChartState = {
    data: [],
    status: 'error',
    message: null,
    isPumpChartShown: true
};


export const fetchHistoricalData = createAsyncThunk(
    'pump_chart/fetchHistoricalData',
    async (tokenAddress: string) => {
        const response = await axios.get(`https://api.helius.com/v0/historical/${tokenAddress}`);
        return response.data;
    }
);

const pumpChartSlice = createSlice({
    name: 'pump_chart',
    initialState,
    reducers: {
        setPumpChartShown: (state, action: PayloadAction<boolean>) => {
            state.isPumpChartShown = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHistoricalData.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(fetchHistoricalData.fulfilled, (state, action: PayloadAction<HistoricalDataPoint[]>) => {
            state.status = 'success';
            state.data = action.payload;
        });
        builder.addCase(fetchHistoricalData.rejected, (state, action) => {
            state.status = 'error';
            state.message = action.error.message || 'Failed to fetch historical data';
        });
    },
});

export default pumpChartSlice.reducer;