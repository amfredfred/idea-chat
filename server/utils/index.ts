/* eslint-disable @typescript-eslint/no-var-requires */
import { MongoClient, ObjectId } from 'mongodb';
const pinataSDK = require('@pinata/sdk');
import { TokenUriMetadata } from 'dto/token.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { Readable } from 'stream';

const pinataApiKey = process.env.PINATA_API_KEY || '';
const pinataApiSecret = process.env.PINATA_API_SECRET || '';
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret);

export async function getToken(id) {
  const client = new MongoClient(process.env.URI);
  await client.connect();
  const db = client.db('Pump');
  const collection = db.collection('Tokens');
  const findOneQuery = { _id: new ObjectId(id) };
  try {
    const response = await collection.findOne(findOneQuery);
    await client.close();
    return response;
  } catch (err) {
    await client.close();
    console.error(`Something went wrong trying to find one user: ${err}\n`);
  }
}

export async function fetchTokenWithSeed(seed: string) {
  const client = new MongoClient(process.env.URI);
  await client.connect();
  const db = client.db('Pump');
  const collection = db.collection('Tokens');
  const findOneQuery = { seed: seed };
  try {
    const response = await collection.findOne(findOneQuery);
    await client.close();
    return response;
  } catch (err) {
    await client.close();
    console.error(`Something went wrong trying to find one user: ${err}\n`);
  }
}

function u8ToHex(u8: number): string {
  return u8.toString(16).padStart(2, '0');
}

/** Ref: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#supported_algorithms */
const supportedAlgorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const;

export type SupportedAlgorithm = (typeof supportedAlgorithms)[number];
export type Message = string | Blob | BufferSource;

export async function hexDigest(
  algorithm: SupportedAlgorithm,
  message: Message,
): Promise<string> {
  let buf: BufferSource;
  if (typeof message === 'string') buf = new TextEncoder().encode(message);
  else if (message instanceof Blob) buf = await message.arrayBuffer();
  else buf = message;
  const hash = await window.crypto.subtle.digest(algorithm, buf);
  return [...new Uint8Array(hash)].map(u8ToHex).join('');
}

export async function storeImages(file: any, name: string): Promise<any> {
  console.log('Uploading to IPFS');
  const options = {
    pinataMetadata: {
      name,
    },
  };
  try {
    const result = await pinata.pinFileToIPFS(file, options);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function storeTokenUriMetadata(metadata: TokenUriMetadata) {
  const options = {
    pinataMetadata: {
      name: `${metadata.name}.json`,
    },
  };
  try {
    const response = await pinata.pinJSONToIPFS(metadata, options);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  //return null;
}

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
