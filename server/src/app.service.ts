import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Mint, getMint } from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';
import { Token, TokenResponse, TokenUriMetadata } from 'dto/token.dto';
import { MongoClient } from 'mongodb';
import { storeImages, storeTokenUriMetadata, BufferStream } from 'utils';

@Injectable()
export class AppService {
  private uri: string = process.env.URI;
  private database_name: string = 'Pump';
  private collection_name: string = 'Tokens';
  private connection: Connection = new Connection('http://127.0.0.1:8899');
  async createToken(token: Token): Promise<object> {
    const client = new MongoClient(this.uri);
    await client.connect();
    const db = client.db(this.database_name);
    const collection = db.collection(this.collection_name);

    try {
      //make checks
      console.log('making checks');
      if (!this.isValidPubkey(token.seed, token.tokenMint, token.authority)) {
        await client.close();
        throw new InternalServerErrorException('Invalid Key');
      }
      if (await this.doesSeedExist(token.seed)) {
        throw new InternalServerErrorException('Seed already exists');
      }
      const mint = new PublicKey(token.tokenMint);
      const authority = new PublicKey(token.authority);
      if ((await this.validateTokenMint(mint, authority)) === false) {
        await client.close();
        throw new InternalServerErrorException(
          'TokenMint Address does not exist on Chain',
        );
      }
      const response = await collection.insertOne(token);
      const tokenResponse: TokenResponse = {
        tokenMint: token.tokenMint,
        authority: token.authority,
        creator: token.creator,
        seed: token.seed,
        id: response.insertedId.toHexString(),
      };
      await client.close();
      console.log(`${response.insertedId} successfully inserted.\n`);
      return {
        status: 'success',
        message: 'Token created succesfully',
        data: tokenResponse,
      };
    } catch (err) {
      await client.close();
      console.error(
        `Something went wrong trying to insert the new documents: ${err.message}\n`,
      );
      throw new InternalServerErrorException(err.response);
    }
  }

  async fetchAllTokens(): Promise<any> {
    const client = new MongoClient(this.uri);
    await client.connect();
    const db = client.db(this.database_name);
    const collection = db.collection(this.collection_name);
    try {
      const tokens = await collection.find({}).toArray();
      await client.close();
      return { data: tokens };
    } catch (err) {
      await client.close();
      throw new InternalServerErrorException(err.response);
    }
  }

  async fetchToken(seed: string): Promise<any> {
    const client = new MongoClient(process.env.URI);
    await client.connect();
    const db = client.db('Pump');
    const collection = db.collection('Tokens');
    const findOneQuery = { seed: seed };
    try {
      const response = await collection.findOne(findOneQuery);
      await client.close();
      if (!response) {
        throw new InternalServerErrorException('Seed Not Found on Database');
      }
      return {
        status: 'success',
        message: 'Token Found',
        data: response,
      };
    } catch (err) {
      await client.close();
      throw new InternalServerErrorException(err.response);
    }
  }

  isValidPubkey(pubkey: string, tokenMint: string, authority: string): boolean {
    try {
      const publicKey: PublicKey = new PublicKey(pubkey);
      const mint: PublicKey = new PublicKey(tokenMint);
      const auth: PublicKey = new PublicKey(authority);
      return (
        PublicKey.isOnCurve(publicKey.toBytes()) &&
        PublicKey.isOnCurve(mint.toBytes()) &&
        PublicKey.isOnCurve(auth.toBytes())
      );
    } catch (err) {
      return false;
    }
  }

  async validateTokenMint(
    addr: PublicKey,
    authority: PublicKey,
  ): Promise<boolean> {
    console.log('Validating Token Mint');
    let mint: Mint;
    try {
      mint = await getMint(this.connection, addr);
    } catch (err) {
      console.log(err);
      return false;
    }
    console.log('mint', mint.isInitialized);
    if (mint.mintAuthority.equals(authority)) {
      return true;
    }
  }

  async handleTokenUris(
    file: any,
    filename: string,
    metadata: TokenUriMetadata,
  ): Promise<object> {
    const stream = new BufferStream(file.buffer);
    const result = await storeImages(stream, filename);
    metadata.image = `https://ipfs.io/ipfs/${result.IpfsHash}`;
    console.log(`Uploading ${metadata.name}...`);
    const metadataUploadResponse = await storeTokenUriMetadata(metadata);
    const tokenUri = `https://ipfs.io/ipfs/${metadataUploadResponse.IpfsHash}`;
    console.log('Token URIs uploaded!');
    console.log(`Token URI: ${tokenUri}`);
    return {
      status: 'success',
      message: 'File uploaded to IPFS successfully',
      data: {
        uri: tokenUri,
        image: metadata.image,
      },
    };
  }
  async doesSeedExist(seed: string): Promise<boolean> {
    const client = new MongoClient(process.env.URI);
    await client.connect();
    const db = client.db('Pump');
    const collection = db.collection('Tokens');
    const findOneQuery = { seed: seed };
    const response = await collection.findOne(findOneQuery);
    await client.close();
    if (response) {
      return true;
    } else {
      return false;
    }
  }
}
