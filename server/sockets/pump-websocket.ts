import WebSocket from 'ws';
import axios from 'axios';
import { Server } from 'socket.io';

interface ITokenMint {
    Name: string;
    Symbol: string;
    Uri: string;
    Mint: string;
    BondingCurve: string;
    User: string;
}

class PumpWebSocket {
    private ws: WebSocket;
    private io: Server;
    private cache: Map<string, any> = new Map();

    constructor(url: string, io: Server) {
        this.ws = new WebSocket(url);
        this.io = io;

        this.ws.on('open', this.onOpen.bind(this));
        this.ws.on('message', this.onMessage.bind(this));
        this.ws.on('error', this.onError.bind(this));
        this.ws.on('close', this.onClose.bind(this));
    }

    private onOpen() {
        console.log("Connected to WebSocket.");

        this.subscribeNewPools();
        this.subscribeToken("8LPjGAPtCywvo51UACHxDg3ygzbrm9qi2XxhB2Ropump");
    }

    private onMessage(data: WebSocket.Data) {
        try {
            const parsedData: ITokenMint = JSON.parse(data.toString());
            this.handleTokenMint(parsedData);
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    }

    private async handleTokenMint(data: ITokenMint) {
        try {

            const cacheKey = `tokenInfo:${data.Mint}`;
            let tokenInfo = this.cache.get(cacheKey);
            console.log({cacheKey})

            if (!tokenInfo) {

                const bdcurve = axios.get('https://rpc.api-pump.fun/bondingCurve', {
                    params: { token: 'GeMS4UALXF2NSbsLdfYqQfn5azAY7TycjyNwJk5AxnCc' },
                    headers: { 'x-api-key': 'f835fa5a-edad-4e07-a7da-4985d1ea9c01' }
                });
                const metadata = await axios.get(data.Uri);
                const [bc, md] = await Promise.allSettled([bdcurve, metadata])
                if (bc.status == 'fulfilled' && md.status == 'fulfilled') {
                    console.log({ bondingCurve: bc?.value.data, metaData: md?.value.data })
                }

                // tokenInfo = response.data;

                // // Store the result in cache
                this.cache.set(cacheKey, tokenInfo);
            }

            console.log("Received token info:", tokenInfo);
            this.io.emit('tokenUpdate', data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.message);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }




    private subscribeNewPools() {
        const payload = {
            method: "subscribeNewPools",
            params: []
        };
        this.ws.send(JSON.stringify(payload));
    }

    private subscribeToken(mint: string) {
        const payload = {
            method: "subscribeToken",
            params: [mint]
        };
        this.ws.send(JSON.stringify(payload));
    }

    private onError(error: Error) {
        console.error("WebSocket error:", error);
    }

    private onClose() {
        console.log("WebSocket connection closed.");
    }
}

export default PumpWebSocket;