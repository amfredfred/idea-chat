import { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { SocketEventCallback, SocketEvents } from '../common/types';

const usePumpScoket = (serverUrl: string) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        const socketInstance = io(serverUrl, {
            transports: ['websocket'],
            autoConnect: false,
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

    const emitEvent = useCallback(<K extends keyof SocketEvents>(event: K, data?: SocketEvents[K]) => {
        if (socket) {
            socket.emit(event, data);
        }
    }, [socket]);

    const onEvent = useCallback(<K extends keyof SocketEvents>(event: K, callback: (data: SocketEvents[K]) => void) => {
        if (socket) {
            const typedCallback: (data: any) => void = (data) => callback(data as SocketEvents[K]);
            socket.on(event, typedCallback as any);
            return () => {
                socket.off(event, typedCallback as any);
            };
        }
        return () => { }; // Return a no-op function if socket is not available
    }, [socket]);

    return { socket, connected, emitEvent, onEvent };
};

export default usePumpScoket;
