import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Metadata } from '@metaplex-foundation/js';
import { config } from 'dotenv';
config();

const PUMPFUN_PROGRAM_ID = new PublicKey('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');
const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) throw new Error(`RPC_URL is not set`);
const connection = new Connection(RPC_URL, 'confirmed');
let lastSignature: null | boolean | string = null;

async function fetchTokenMetadata(mintAddress: string) {
    try {
        const metadataPDA = await Metadata.getPDA(new PublicKey(mintAddress));
        const metadataAccount = await Metadata.load(connection, metadataPDA);
        return metadataAccount.data;
    } catch (error) {
        console.error(`Error fetching metadata for mint address ${mintAddress}:`, error);
    }
}

async function fetchPumpfunTokens() {
    try {
        const options = lastSignature ? { before: lastSignature, limit: 10 } : { limit: 10 };
        const signatures = await connection.getSignaturesForAddress(PUMPFUN_PROGRAM_ID, options as any);

        for (const { signature } of signatures) {
            lastSignature = signature;

            const transaction = await connection.getTransaction(signature, { commitment: 'confirmed', maxSupportedTransactionVersion: 2000 });

            if (transaction && transaction.meta) {
                const postTokenBalances = transaction.meta.postTokenBalances;
                const preTokenBalances = transaction.meta.preTokenBalances;

                if (postTokenBalances && preTokenBalances) {
                    if (postTokenBalances.length > preTokenBalances.length) {
                        for (let i = 0; i < postTokenBalances.length; i++) {
                            if (!preTokenBalances[i] || postTokenBalances[i].mint !== preTokenBalances[i].mint) {
                                console.log(`New token created with signature: ${signature}`);
                                console.log(`Mint address: ${postTokenBalances[i].mint}`);

                                const metadata = await fetchTokenMetadata(postTokenBalances[i].mint);
                                if (metadata) {
                                    console.log(`Metadata for mint ${postTokenBalances[i].mint}:`, metadata);
                                }
                            }
                        }
                    }
                } else {
                    console.log({ preTokenBalances, postTokenBalances });
                }
            }
        }
    } catch (error) {
        console.error('Error fetching Pumpfun tokens:', error);
        if ((error as Error).message.includes('125/second request limit reached')) {
            console.log('Rate limit reached, waiting before retrying...');
            await new Promise(resolve => setTimeout(resolve, 60000));
        }
    }
}

async function listenToNewBlocks() {
    while (true) {
        await fetchPumpfunTokens();
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
}

listenToNewBlocks().catch(console.error);
