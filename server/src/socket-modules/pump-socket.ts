// src/pumpSocket.ts
import { Server, Socket } from 'socket.io';
import { getPumpList } from '../common/api';

class PumpSocket {
    private io: Server;
    private roomName: string = 'pumpRoom';
    private intervalId: NodeJS.Timeout | null = null;

    constructor(io: Server) {
        this.io = io;
        this.startInterval();
        this.io.on('connection', this.onConnection.bind(this));
    }

    private onConnection(socket: Socket) {
        console.log(`User connected: ${socket.id}`);
        socket.join(this.roomName);

        socket.on('requestPumpList', async () => {
            const pumpList = await getPumpList();
            socket.emit('pumpList', pumpList);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    }

    private async sendPumpList() {
        const pumpList = await getPumpList();
        this.io.to(this.roomName).emit('pumpList', pumpList);
    }

    private startInterval() {
        this.intervalId = setInterval(async () => {
            await this.sendPumpList();
        }, 60000); // Sends updates every 60 seconds
    }

    public stopInterval() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

export default PumpSocket;
