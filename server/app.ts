import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import PumpWebSocket from './sockets/pump-websocket'

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "HEAD"]
    }
});

app.use(cors());
app.get('/', (req, res) => {
    res.send('PumpWebSocket Server');
});

new PumpWebSocket('wss://rpc.api-pump.fun/ws', io);

export { server };