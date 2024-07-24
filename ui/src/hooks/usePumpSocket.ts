import { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { PumpSocketReceived, PumpSocketSend } from '../common/types';

const usePumpScoket = (serverUrl: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        const socketInstance = io(serverUrl, {
            autoConnect: true,
            upgrade: false,
        });

        socketInstance.on('connect', () => {
            setConnected(true);
        });

        socketInstance.on('disconnect', () => {
            setConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, [serverUrl]);

    const emitEvent = useCallback(<K extends keyof PumpSocketSend>(event: K, data?: any) => {
        if (socket) {
            socket.emit(event, data);
        }
    }, [socket]);

    const onEvent = useCallback(<K extends keyof PumpSocketReceived>(event: K, callback: (data: PumpSocketReceived[K]) => void) => {
        if (socket) {
            const typedCallback: (data: any) => void = (data) => callback(data as PumpSocketReceived[K]);
            socket.on(event, typedCallback as any);
            return () => {
                socket.off(event, typedCallback as any);
            };
        }
        return () => { };
    }, [socket]);

    return { socket, connected, emitEvent, onEvent };
};

export default usePumpScoket;
