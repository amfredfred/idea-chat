import React, { useCallback, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Button, Box, IconButton, Divider, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { setLoading, setIsVisible, setSelectedtokenToSend, setSelectedtokenToReceive, fetchQuoteSwap, setAmountToSend, setError, setAmountToReceive } from '../../libs/redux/slices/token-swap-slice';
import { Fullscreen, FullscreenExit, Minimize, Close } from '@mui/icons-material';
import TokenSwapInput from './TokenSwapInput';
import TokenSwapAnalytic from './TokenSwapAnalytic';
import { parseAmount } from '../../utils';
import { motion } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, VersionedTransaction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import { NativeToken } from '../../libs/redux/initial-states';

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
    quoteResponse,
    isFetchingRate,
    isFetchingQuoteSwapError,
    isFetchingRateError,
    settings
  } = useAppSelector(state => state.tokenSwap);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const wallet = useWallet()

  const RPC_URL = import.meta.env.VITE_RPC_URL;
  const FEE_ACCOUNT = import.meta.env.VITE_FEE_ACCOUNT
  const connection = new Connection(RPC_URL, 'confirmed')

  const handleSwap = async () => {
    dispatch(setLoading(true));
    try {

      const [feeAccount] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("referral_ata"),
          (new PublicKey(FEE_ACCOUNT)).toBuffer(),
          (new PublicKey(NativeToken.address)).toBuffer(),
        ],
        new PublicKey("REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3")
      );

      console.log({ feeAccount })

      const { swapTransaction } = await (
        await fetch('https://quote-api.jup.ag/v6/swap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            quoteResponse,
            userPublicKey: wallet.publicKey?.toString(),
            feeAccount,
            // dynamicComputeUnitLimit: true, // allow dynamic compute limit instead of max 1,400,000
            // custom priority fee
            // prioritizationFeeLamports: 'auto' // or custom lamports: 1000
          })
        })
      ).json();
      const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      const latestBlockHash = await connection.getLatestBlockhash();
      const signedTransaction = await wallet.signTransaction?.(transaction);
      const deSerializedTransaction = signedTransaction?.serialize?.() as any
      const txid = await connection.sendRawTransaction(deSerializedTransaction, {
        skipPreflight: true,
        maxRetries: 2
      });

      const confirmTransaction = connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: txid
      });

      toast.promise(confirmTransaction, {})
      await confirmTransaction

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
      dispatch(fetchQuoteSwap({
        fromMint: tokenToSend.address,
        toMint: tokenToReceive.address,
        amount: parseAmount(amountToSend, tokenToSend.decimals),
        settings
      }));
    } else {
      dispatch(setAmountToReceive(0))
    }
  }, [dispatch, tokenToSend, tokenToReceive, amountToSend, settings]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchRate();
    }, 800);
    return () => clearTimeout(timeoutId);
  }, [fetchRate, amountToSend]);

  useEffect(() => {
    if (error) toast(error, { type: 'error', toastId: "TNX_ERROR" })
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
                disabled={loading || isFetchingQuoteSwap || isFetchingRate || isFetchingQuoteSwapError || isFetchingRateError}
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSwap}
                className=" text-white font-bold py-2 px-4 rounded-full"
                style={{ borderRadius: '50px', padding: '.6rem', ...buttonStyle() }}
                disableElevation
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