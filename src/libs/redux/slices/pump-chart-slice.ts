import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  IPumpTokenChartDetail } from "../../../common/types";

interface HistoricalDataPoint {
    timestamp: number;
    value: number;
}

interface PumpChartState {
    data: HistoricalDataPoint[];
    status: 'idle' | 'pending' | 'error' | 'success'
    message: string | null,
    isPumpChartShown: boolean
    pumpItem: IPumpTokenChartDetail | null
}

const initialState: PumpChartState = {
    data: [],
    status: 'pending',
    message: null,
    isPumpChartShown: false,
    pumpItem: null
};


export const fetchHistoricalData = createAsyncThunk(
    'pump_chart/fetchHistoricalData',
    async (tokenAddress: string, thumApi) => {
        const response = await axios.get(`https://api.helius.com/v0/historical/${tokenAddress}`);
        thumApi

        // IPumpTokenChartDetail
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
        builder.addCase(fetchHistoricalData.pending, (state, { payload }) => {
            console.log({ payload })
            state.isPumpChartShown = false
            state.status = 'pending';
        });
        builder.addCase(fetchHistoricalData.fulfilled, (state, action: PayloadAction<HistoricalDataPoint[]>) => {
            state.status = 'success';
            state.isPumpChartShown = true
            state.data = action.payload;

            // state.pumpItem = 
        });
        builder.addCase(fetchHistoricalData.rejected, (state, action) => {
            state.status = 'error';
            state.isPumpChartShown = true
            state.message = action.error.message || 'Failed to fetch historical data';
        });
    },
});

export const { 
    setPumpChartShown
} = pumpChartSlice.actions

export default pumpChartSlice.reducer;