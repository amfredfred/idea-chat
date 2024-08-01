import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import io, { Socket } from 'socket.io-client';
import { AppDispatch } from '../store';
import { PumpSocketReceived, PumpSocketSend } from '../../../common/types';

interface PumpSocketState {
    socket: Socket | null;
    connected: boolean;
    pumpList: PumpSocketReceived['pumpList'] | null;
}

const initialState: PumpSocketState = {
    socket: null,
    connected: false,
    pumpList: null,
};

const pumpSocketSlice = createSlice({
    name: 'pumpSocket',
    initialState,
    reducers: {
        setSocket: (state, action: PayloadAction<Socket | null>) => {
            state.socket = action.payload;
        },
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.connected = action.payload;
        },
        setPumpList: (state, action: PayloadAction<PumpSocketReceived['pumpList']>) => {
            state.pumpList = action.payload;
        },
    },
});

export const { setSocket, setConnected, setPumpList } = pumpSocketSlice.actions;

export const connectSocket = (serverUrl: string) => async (dispatch: AppDispatch) => {
    const socketInstance = io(serverUrl, {
        autoConnect: true,
        upgrade: true,
    });

    socketInstance.on('connect', () => {
        dispatch(setConnected(true));
    });

    socketInstance.on('disconnect', () => {
        dispatch(setConnected(false));
    });

    socketInstance.on('pumpListUpdate', (data: PumpSocketReceived['pumpList']) => {
        dispatch(setPumpList(data));
    });

    dispatch(setSocket(socketInstance));

    return () => {
        socketInstance.disconnect();
    };
};

export const emitEvent = <K extends keyof PumpSocketSend>(event: K, data?: any) => (dispatch: AppDispatch, getState: () => { pumpSocket: PumpSocketState }) => {
    const { socket } = getState().pumpSocket;
    if (socket) {
        socket.emit(event, data);
    }
};

export const onEvent = <K extends keyof PumpSocketReceived>(event: K, callback: (data: PumpSocketReceived[K]) => void) => (dispatch: AppDispatch, getState: () => { pumpSocket: PumpSocketState }) => {
    const { socket } = getState().pumpSocket;
    if (socket) {
        const typedCallback: (data: any) => void = (data) => callback(data as PumpSocketReceived[K]);
        socket.on(event, typedCallback as any);
        return () => {
            socket.off(event, typedCallback as any);
        };
    }
    return () => { };
};

export default pumpSocketSlice.reducer;