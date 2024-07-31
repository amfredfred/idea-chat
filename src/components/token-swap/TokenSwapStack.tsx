import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Button, Box, IconButton, Divider, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { setIsVisible, setSelectedtokenToSend, setSelectedtokenToReceive, setAmountToSend, setError, handleTokenSwap } from '../../libs/redux/slices/token-swap-slice';
import { FullscreenExit, Remove, Close, Settings, CandlestickChartRounded } from '@mui/icons-material';
import TokenSwapInput from './TokenSwapInput';
import TokenSwapAnalytic from './TokenSwapAnalytic';
import { motion } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
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
    fetchQuoteState,
    quoteResponse,
    fetchTokenRateState,
    tokenSwapState
  } = useAppSelector(state => state.tokenSwap);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isShowingChart, setIsShowingChart] = useState(false);
  const wallet = useWallet()

  const RPC_URL = import.meta.env.VITE_RPC_URL;
  const connection = new Connection(RPC_URL, 'confirmed')

  const handleSwap = async () => {
    if (tokenSwapState !== 'pending') {
      console.log('callled')
      dispatch(handleTokenSwap({
        connection,
        wallet,
        quoteResponse
      }))
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setIsShowingChart(false);
  };

  const toggleFullscreen = () => {
    setIsShowingChart(!isShowingChart);
    setIsMinimized(false)
  };

  const closeWindow = () => {
    setIsShowingChart(false);
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

  const isButtonDisabled = loading || fetchQuoteState == 'pending' || fetchTokenRateState == 'pending' || tokenSwapState == 'pending'


  useEffect(() => {
    if (error) toast(error, { type: 'error', toastId: "TNX_ERROR" })
    return () => { dispatch(setError('')) }
  }, [error, dispatch])


  return (
    <Draggable   >
      <Box
        sx={{
          position: isShowingChart ? 'fixed' : 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isShowingChart ? '80vw' : '400px',
          height: isShowingChart ? '80vh' : 'auto',
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
          <h1 style={{ margin: '0', padding: '0 8px' }}>Swap</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton className=' bg-red-400' size="small" onClick={() => null}>
              <Settings className='text-yellow-100' />
            </IconButton>

            <IconButton size="small" onClick={toggleFullscreen}>
              {isShowingChart ? <FullscreenExit className='text-yellow-100' /> : <CandlestickChartRounded className='text-yellow-100' />}
            </IconButton>

            <IconButton className=' bg-red-400' size="small" onClick={toggleMinimize}>
              <Remove className='text-yellow-100' />
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
            {isShowingChart && <Box sx={{ flexGrow: 1 }}>CHART GOES HERE</Box>}
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
                loading={fetchQuoteState == 'pending'}
                onTokenSelect={(pump) => dispatch(setSelectedtokenToReceive(pump))}
              // amount="~$3.3K"
              />

              <TokenSwapAnalytic />

              <Button
                disabled={isButtonDisabled}
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