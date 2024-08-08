import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { Button, Box, IconButton, CircularProgress, Tab } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { setIsVisible, setSelectedtokenToSend, setSelectedtokenToReceive, setAmountToSend, setError, handleTokenSwap } from '../../libs/redux/slices/token-swap-slice';
import { Remove, Close, Settings, CandlestickChartRounded, Fullscreen } from '@mui/icons-material';
import TokenSwapInput from './TokenSwapInput';
import TokenSwapAnalytic from './TokenSwapAnalytic';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { toast } from 'react-toastify';
import { useMediaQuery } from '@mui/material';
import { getDimensions, parseAmount } from '../../utils';
import { fetchPumpTokenDetails } from '../../libs/redux/slices/pump-chart-slice';
import TokenSwapConfigs from './TokenSwapConfigs';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';

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
    tokenSwapState,
    settings
  } = useAppSelector(state => state.tokenSwap);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isReady, setIsReady] = useState(false);
  const [value, setValue] = React.useState('1');
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
        quoteResponse,
        fromMint: String(tokenToSend?.address),
        toMint: String(tokenToReceive?.address),
        amount: parseAmount(amountToSend, Number(tokenToSend?.decimals)),
        settings
      }));
    }
  };

  const handleLoadAndShowChart = () => {
    dispatch(fetchPumpTokenDetails(String(tokenToSend?.address)))
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event
    setValue(newValue);
  };

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
    if (tokenSwapState == 'pending' && fetchQuoteState == 'pending')
      return <div className='flex items-center gap-2'>Fetching Quotes <CircularProgress style={{ color: theme.text_color }} size={20} thickness={10} /></div>
    if (tokenSwapState == 'pending')
      return <div className='flex items-center gap-2'>Pending<CircularProgress style={{ color: theme.text_color }} size={20} thickness={10} /></div>
    if (loading)
      return <CircularProgress size={25} />;
    if (tokenToReceive?.symbol?.toUpperCase?.() === 'SOL') {
      return "SELL";
    }
    if (tokenToSend?.symbol?.toUpperCase?.() === 'SOL') {
      return "BUY";
    }
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
          position: 'fixed',
          width: 400,
          maxWidth: '100vw',
          maxHeight: '100vh',
          zIndex: 1000,
          borderRadius: isMinimized ? '10px' : '15px',
          borderBottomLeftRadius: isMobile ? 0 : isMinimized ? '10px' : '15px',
          borderBottomRightRadius: isMobile ? 0 : isMinimized ? '10px' : '15px',
          overflow: 'hidden',
          display: isReady ? 'black' : 'none',
          flexDirection: 'row',
          // background: 'linear-gradient(rgb(4, 36, 65) 0%, rgb(42, 36, 60) 100%) no-repeat;',
          backgroun: theme.menu_bg,
          boxShadow: isMinimized ? '' : `0 0 4px ${theme.active_color}`,
          border: 'solid thin',
          bottom: (isMobile) ? 0 : undefined,
          backdropFilter: `blur(144px)`,
          borderColor: isMinimized ? theme.text_color : 'transparent'
        }}
      >
        <TabContext value={value}  >
          <Box sx={{ background: theme.pump_card_bg }} className=' flex items-center justify-between gap-4  px-4'>
            <Box className=' flex-grow' >
              <TabList TabIndicatorProps={{ style: { display: 'none' } }} onChange={handleChange}>
                <Tab
                  style={{ color: value == '1' ? theme.active_color : theme.inactive_color }}
                  label={"Swap"}
                  value="1" />
                {!isMinimized && <Tab
                  style={{ color: value == '2' ? theme.active_color : theme.inactive_color }}
                  label={<Settings style={{ color: value == '2' ? theme.active_color : theme.inactive_color }} />}
                  value="2" />}
              </TabList>
            </Box>
            <div className="text-yellow-100 flex w-full" style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: isMobile ? 'default' : 'move', // Disable move cursor on mobile
            }}>
              <div className=' flex items-center justify-between  ml-auto'>
                <IconButton size="small" onClick={handleLoadAndShowChart} >
                  <CandlestickChartRounded className='text-yellow-100' />
                </IconButton>

                <IconButton className='bg-red-400' size="small" onClick={toggleMinimize}>
                  {isMinimized ? <Fullscreen style={{ color: theme.active_color }} /> : <Remove style={{ color: theme.inactive_color }} />}
                </IconButton>

                <IconButton size="small" onClick={closeWindow}>
                  <Close className='text-yellow-100' />
                </IconButton>
              </div>
            </div>
          </Box>
          {!isMinimized &&
            <Box>
              <div
                className="w-full h-1"
                style={{
                  backgroundImage: `linear-gradient(to right , ${theme.text_color} , ${theme.menu_bg} , ${theme.text_color} )`,
                }}
              />
              <TabPanel value="1">
                {!isMinimized && ((!tokenToReceive?.symbol || !tokenToSend?.symbol) ? Loading : (
                  <motion.div
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    exit={{ x: -100 }}>
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
                        variant="outlined"
                        color="primary"
                        onClick={handleSwap}
                        className="text-white font-bold py-2 px-4 rounded-full"
                        style={{ borderRadius: '50px', padding: '.6rem', color: theme.text_color, borderColor: theme.text_color, background: theme.menu_bg }}
                        disableElevation
                      >
                        {buttonText()}
                      </Button>
                    </Box>
                    {error && <p>Error: {error}</p>}
                  </motion.div>
                ))}
              </TabPanel>
              <TabPanel value="2">
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}>
                  <TokenSwapConfigs />
                </motion.div>
              </TabPanel>
              <div
                className="w-full h-1"
                style={{
                  backgroundImage: `linear-gradient(to right , ${theme.text_color} , ${theme.menu_bg} , ${theme.text_color} )`,
                }}
              />
            </Box>
          }
        </TabContext>

      </Box>

    </Draggable>
  );
};

export default TokenswapStack;