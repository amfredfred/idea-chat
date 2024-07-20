import { Readable } from 'stream';

export class BufferStream extends Readable {
  buffer: any;
  sent: boolean;
  constructor(buffer) {
    super();
    this.buffer = buffer;
    this.sent = false;
  }

  _read() {
    if (!this.sent) {
      this.push(this.buffer);
      this.sent = true;
    } else {
      this.push(null);
    }
  }
}

const buffer = Buffer.from('This is the content of the buffer');
const bufferStream = new BufferStream(buffer);

bufferStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  console.log(chunk.toString());
});

bufferStream.on('end', () => {
  console.log('No more data.');
});
