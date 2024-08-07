import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Button, Box, IconButton, Divider, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { setIsVisible, setSelectedtokenToSend, setSelectedtokenToReceive, setAmountToSend, setError, handleTokenSwap } from '../../libs/redux/slices/token-swap-slice';
import { Remove, Close, Settings, CandlestickChartRounded } from '@mui/icons-material';
import TokenSwapInput from './TokenSwapInput';
import TokenSwapAnalytic from './TokenSwapAnalytic';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { toast } from 'react-toastify';
import { useMediaQuery } from '@mui/material';
import { getDimensions } from '../../utils';
import { fetchPumpTokenDetails } from '../../libs/redux/slices/pump-chart-slice';

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const wallet = useWallet();
  const containerRef = useRef<HTMLDivElement>(null)
  const theme = useAppSelector(state => state.theme.current.styles)
  const RPC_URL = import.meta.env.VITE_RPC_URL;
  const connection = new Connection(RPC_URL, 'confirmed');

  const handleSwap = async () => {
    if (tokenSwapState !== 'pending') {
      dispatch(handleTokenSwap({
        connection,
        wallet,
        quoteResponse
      }));
    }
  };

  const handleLoadAndShowChart = () => {
    dispatch(fetchPumpTokenDetails(String(tokenToSend?.address)))
  }

  const toggleMinimize = () => {
    setIsMinimized(prev => {
      const { width } = getDimensions(containerRef)
      const centerX = window.innerWidth / 2 - (width / 2);
      const centerY = isMobile ? 0 : !prev ? 40 : position.y;
      setPosition({ x: centerX, y: centerY });
      return !prev
    });
  };

  const closeWindow = () => {
    setIsReady(false);
    setIsMinimized(false);
    dispatch(setIsVisible(false));
  };

  useEffect(() => {
    setIsMinimized(false);
  }, [tokenToSend, tokenToReceive]);

  useEffect(() => {
    if (isVisible) {
      const centerX = window.innerWidth / 2 - window.innerWidth / 4;
      const centerY = isMobile ? 0 : window.innerHeight / 2 - window.innerHeight / 4;
      setPosition({ x: centerX, y: centerY });
      setIsReady(true);
    }
  }, [isVisible, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = getDimensions(containerRef)
      const centerX = window.innerWidth / 2 - (width / 2);
      const centerY = isMobile ? 0 : isMinimized ? 40 : window.innerHeight / 2 - height;
      setPosition({ x: centerX, y: centerY });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, isMinimized]);

  const Loading = (
    <Box display='flex' padding='5rem' overflow='hidden' alignItems='center' justifyContent='center'>
      <CircularProgress />
    </Box>
  );

  const buttonText = () => {
    if (loading)
      return <CircularProgress size={25} />;
    if (tokenToReceive?.symbol?.toUpperCase?.() === 'SOL') {
      return "SELL";
    }
    if (tokenToSend?.symbol?.toUpperCase?.() === 'SOL') {
      return "BUY";
    }
  };

  const buttonStyle = () => {
    if (loading) return {
      backgroundColor: theme.inactive_color,
      color: theme.active_color
    };
    if (tokenToReceive?.symbol?.toUpperCase?.() === 'SOL') return {
      backgroundColor: theme.active_color,
      color: theme.inactive_color
    };
    if (tokenToSend?.symbol?.toUpperCase?.() === 'SOL') return {
      backgroundColor: theme.bgColor,
      color:theme.active_color
    };
  };

  const isButtonDisabled = loading || fetchQuoteState === 'pending' || fetchTokenRateState === 'pending' || tokenSwapState === 'pending';

  useEffect(() => {
    if (error) toast(error, { type: 'error', toastId: "TNX_ERROR" });
    return () => { dispatch(setError('')); };
  }, [error, dispatch]);

  return (
    <Draggable
      position={position}
      onStop={(e, data) => {
        e
        setPosition({ x: data.x, y: data.y })
      }}
      disabled={isMobile} // Disable dragging on mobile devices
    >
      <Box
        ref={containerRef}
        sx={{
          position: 'fixed', // (isMobile && isMinimized) ? 'revert' :
          width: 400,
          maxWidth: '100vw',
          maxHeight: '100vh',
          zIndex: 1000,
          borderRadius: isMinimized ? '10px' : '15px',
          borderBottomLeftRadius: isMobile ? 0 : isMinimized ? '10px' : '15px',
          borderBottomRightRadius: isMobile ? 0 : isMinimized ? '10px' : '15px',
          overflow: 'hidden',
          display: isReady ? 'flex' : 'none',
          flexDirection: 'column',
          // background: 'linear-gradient(rgb(4, 36, 65) 0%, rgb(42, 36, 60) 100%) no-repeat;',
          backgroun: theme.menu_bg,
          boxShadow: isMinimized ? '' : '0 10px 4px rgba(0,0,0,0.8)',
          border: 'solid thin',
          borderColor: theme.active_color,
          bottom: (isMobile) ? 0 : undefined,
          backdropFilter:`blur(40px)`
        }}
      >
        <div className="text-yellow-100 flex w-full" style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: isMobile ? 'default' : 'move', // Disable move cursor on mobile
          padding: '8px',
        }}>
          <h1 style={{ margin: '0', padding: '0 8px' }}>Swap</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton className='bg-red-400' size="small" onClick={() => null}>
              <Settings className='text-yellow-100' />
            </IconButton>

            <IconButton size="small" onClick={handleLoadAndShowChart} >
              <CandlestickChartRounded className='text-yellow-100' />
            </IconButton>

            <IconButton className='bg-red-400' size="small" onClick={toggleMinimize}>
              <Remove className='text-yellow-100' />
            </IconButton>

            <IconButton size="small" onClick={closeWindow}>
              <Close className='text-yellow-100' />
            </IconButton>
          </div>
        </div>

        {!isMinimized && <Divider orientation='horizontal' className='bg-gray- w-11/12 rounded-full' style={{ marginInline: 'auto' }} />}

        {!isMinimized && ((!tokenToReceive?.symbol || !tokenToSend?.symbol) ? Loading : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            style={{ padding: '1rem' }}>
            <Box gap='1rem' display='flex' flexDirection='column'>
              <TokenSwapInput
                side="pay"
                onChange={value => dispatch(setAmountToSend(value))}
                selectedToken={tokenToSend}
                value={amountToSend}
                onTokenSelect={(pump) => dispatch(setSelectedtokenToSend(pump))}
              />

              <TokenSwapInput
                side="receive"
                readonly
                onChange={() => null}
                selectedToken={tokenToReceive}
                value={amountToReceive}
                loading={fetchQuoteState === 'pending'}
                onTokenSelect={(pump) => dispatch(setSelectedtokenToReceive(pump))}
              />

              <TokenSwapAnalytic />

              <Button
                disabled={isButtonDisabled}
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSwap}
                className="text-white font-bold py-2 px-4 rounded-full"
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
    </Draggable>
  );
};

export default TokenswapStack;