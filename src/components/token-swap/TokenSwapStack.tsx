import React, { useCallback, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Button, Box, IconButton, Divider, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { setLoading, setIsVisible, setSelectedtokenToSend, setSelectedtokenToReceive, fetchQuoteSwap, setAmountToSend, setError } from '../../libs/redux/slices/token-swap-slice';
import { Fullscreen, FullscreenExit, Minimize, Close } from '@mui/icons-material';
import TokenSwapInput from './TokenSwapInput';
import TokenSwapAnalytic from './TokenSwapAnalytic';
import { parseAmount } from '../../utils';
import { motion } from 'framer-motion'
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { VersionedTransaction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';

const TokenswapStack: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    error,
    isVisible,
    tokenToSend,
    tokenToReceive,
    loading,
    amountToReceive,
    amountToSend,
    isFetchingQuoteSwap,
    quoteResponse
  } = useAppSelector(state => state.tokenSwap);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wallet = useWallet()
  const { connection } = useConnection()

  const handleSwap = async () => {
    dispatch(setLoading(true));
    try {
      const { swapTransaction } = await (
        await fetch('https://quote-api.jup.ag/v6/swap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quoteResponse,
            userPublicKey: wallet.publicKey?.toString(),
            // feeAccount is optional. Use if you want to charge a fee. feeBps must have been passed in /quote API.
            // feeAccount: "fee_account_public_key"
            // dynamicComputeUnitLimit: true, // allow dynamic compute limit instead of max 1,400,000
            // custom priority fee
            // prioritizationFeeLamports: 'auto' // or custom lamports: 1000
          })
        })
      ).json();

      console.log({ swapTransaction }, wallet.publicKey,wallet.connected);

      // Deserialize the transaction
      const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      console.log({ transaction });

      // Sign the transaction using the wallet's signTransaction method
      const signedTransaction = await wallet.signTransaction?.(transaction);
      console.log({ signedTransaction });

      // Get the latest block hash
      const latestBlockHash = await connection.getLatestBlockhash();
      console.log({ latestBlockHash });

      // Send the signed transaction to the Solana network
      const txid = await connection.sendRawTransaction(signedTransaction?.serialize?.() as any, {
        skipPreflight: true,
        maxRetries: 2
      });

      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid
      });

      console.log(`https://solscan.io/tx/${txid}`);
    } catch (error) {
      dispatch(setError((error as Error)?.message));
      console.log({ error });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsMinimized(false)
  };

  const closeWindow = () => {
    setIsFullscreen(false);
    setIsMinimized(false)
    dispatch(setIsVisible(false))
  };

  useEffect(() => {
    return setIsMinimized(false);
  }, [tokenToSend, tokenToReceive])

  const Loading = <Box display='flex' padding='5rem' overflow='hidden' alignItems='center' justifyContent='center'>
    <CircularProgress />
  </Box>


  const buttonText = () => {
    if (loading)
      return <CircularProgress size={25} />
    if (tokenToReceive?.symbol?.toUpperCase?.() == 'SOL') {
      return "SELL"
    }
    if (tokenToSend?.symbol?.toUpperCase?.() == 'SOL') {
      return "BUY"
    }
  }

  const buttonStyle = () => {
    if (loading) return {
      backgroundColor: "black"
    }
    if (tokenToReceive?.symbol?.toUpperCase?.() == 'SOL') return {
      backgroundColor: "#FF0000"
    }
    if (tokenToSend?.symbol?.toUpperCase?.() == 'SOL') return {
      backgroundColor: "green"
    }
  }


  const fetchRate = useCallback(() => {
    if (tokenToSend?.address && tokenToReceive?.address && amountToSend) {
      dispatch(fetchQuoteSwap({ fromMint: tokenToSend.address, toMint: tokenToReceive.address, amount: parseAmount(amountToSend, tokenToSend.decimals) }));
    }
  }, [dispatch, tokenToSend, tokenToReceive, amountToSend]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  useEffect(() => {
    if (error) toast(error, { type: 'error' })
    return () => { dispatch(setError('')) }
  }, [error, dispatch])

  return (
    <Draggable   >
      <Box
        sx={{
          position: isFullscreen ? 'fixed' : 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isFullscreen ? '80vw' : '400px',
          height: isFullscreen ? '80vh' : 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
          zIndex: 1000,
          borderRadius: isMinimized ? '10px' : '20px',
          overflow: 'hidden',
          display: isVisible ? 'flex' : 'none',
          flexDirection: 'column',
          backdropFilter: 'blur(50px)',
          background: 'linear-gradient(rgb(4, 36, 65) 0%, rgb(42, 36, 60) 100%) no-repeat;',
          boxShadow: isMinimized ? '' : '0 10px 4px rgba(0,0,0,0.8)',

        }}
      >
        <div className=" text-yellow-100 flex w-full  " style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'move',
          padding: '8px',
          // backgroundColor: 'black',
          // borderBottom: '1px solid #ccc'
        }}>
          <h1 style={{ margin: '0', padding: '0 8px' }}>Token Swap</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton className=' bg-red-400' size="small" onClick={toggleMinimize}>
              <Minimize className='text-yellow-100' />
            </IconButton>
            <IconButton size="small" onClick={toggleFullscreen}>
              {isFullscreen ? <FullscreenExit className='text-yellow-100' /> : <Fullscreen className='text-yellow-100' />}
            </IconButton>
            <IconButton size="small" onClick={closeWindow}>
              <Close className='text-yellow-100' />
            </IconButton>
          </div>
        </div>

        {!isMinimized && <Divider orientation='horizontal' className=' bg-gray-300 w-11/12 rounded-full' style={{ marginInline: 'auto' }} />}

        {!isMinimized && ((!tokenToReceive?.symbol || !tokenToSend?.symbol) ? Loading : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ padding: '1rem' }}>
            {isFullscreen && <Box sx={{ flexGrow: 1 }}>CHART GOES HERE</Box>}
            <Box gap='1rem' display='flex' flexDirection='column'>
              <TokenSwapInput
                side="pay"
                onChange={value => dispatch(setAmountToSend(value))}
                selectedToken={tokenToSend}
                value={amountToSend}
                onTokenSelect={(pump) => dispatch(setSelectedtokenToSend(pump))}
              // amount="~$3.3K"
              />

              <TokenSwapInput
                side="receive"
                readonly
                onChange={() => null}
                selectedToken={tokenToReceive}
                value={amountToReceive}
                loading={isFetchingQuoteSwap}
                onTokenSelect={(pump) => dispatch(setSelectedtokenToReceive(pump))}
              // amount="~$3.3K"
              />

              <TokenSwapAnalytic />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSwap}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4   rounded-full"
                style={{ borderRadius: '50px', padding: '.6rem', ...buttonStyle() }}
              >
                {buttonText()}
              </Button>
            </Box>
            {error && <p>Error: {error}</p>}
          </motion.div>
        ))}
      </Box>
    </Draggable >
  );
};


export default TokenswapStack