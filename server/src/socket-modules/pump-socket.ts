import { Server, Socket } from 'socket.io';
import { getPumpList } from '../common/api';

const defaultParams = {
    limit: '200',
    orderby: 'usd_market_cap',
    direction: 'desc',
    pump: 'true',
    usd_market_cap: '20'
};
 
class PumpSocket {
    private io: Server;
    private intervalId: NodeJS.Timeout | null = null;
    private searchParams = new Map<string, URLSearchParams>();

    constructor(io: Server) {
        this.io = io;
        this.startInterval();
        this.io.on('connection', this.onConnection.bind(this));
    }

    private onConnection(socket: Socket) {
        socket.on('requestPumpList', async (search_params) => {
            const params = new URLSearchParams(search_params || defaultParams);
            this.searchParams.set(socket.id, params);
            const pumpList = await getPumpList(params);
            socket.emit('pumpList', pumpList);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
            this.searchParams.delete(socket.id);
        });
    }

    private async sendPumpList() {
        try {
            for (const [socketId, params] of this.searchParams.entries()) {
                console.log({ socketId, params })
                const pumpList = await getPumpList(params);
                this.io.to(socketId).emit('pumpList', pumpList);
            }
        } catch (error) {
            console.log(`Error@PumpSocket -> sendPumpList: ${error}`);
        }
    }

    private startInterval() {
        this.intervalId = setInterval(async () => {
            await this.sendPumpList();
        }, 5000); // Sends updates every 5 seconds
    }

    public stopInterval() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

export default PumpSocket;