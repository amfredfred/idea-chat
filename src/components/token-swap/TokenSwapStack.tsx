import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Button, Box, IconButton, Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { setLoading, setIsVisible, setSelectedTokenA, setSelectedTokenB } from '../../libs/redux/slices/token-swap-slice';
import { Line } from 'react-chartjs-2';
import { Fullscreen, FullscreenExit, Minimize, Close } from '@mui/icons-material';
import TokenSwapInput from './TokenSwapInput';
import TokenSwapAnalytic from './TokenSwapAnalytic';
import { useWallet } from '@solana/wallet-adapter-react';

const TokenswapStack: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, isVisible, tokenA, tokenB } = useAppSelector(state => state.tokenSwap);
  const wallet = useWallet()

  console.log({ wallet })

  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleSwap = () => {
    dispatch(setLoading(true));
    // Add logic to perform the swap here
    // After performing the swap, update the state accordingly
    dispatch(setLoading(false));
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsMinimized(!isMinimized)
  };

  const closeWindow = () => {
    setIsFullscreen(false);
    setIsMinimized(false)
    dispatch(setIsVisible(false))
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Added 'Jul'
    datasets: [
      {
        label: 'Token A',
        data: [65, 59, 80, 81, 56, 55, 70], // Added data for 'Jul'
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
      {
        label: 'Token B',
        data: [28, 48, 40, 19, 86, 27, 33], // Added data for 'Jul'
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
      },
    ],
  };

  const handleInputChange = (value: any) => {
    console.log({ value })
  }

  return (
    <Draggable handle=".draggable-handle"   >
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
          borderRadius: '20px',
          overflow: isMinimized ? 'hidden' : 'auto',
          display: isVisible ? 'flex' : 'none',
          flexDirection: 'column',
          backdropFilter: 'blur(50px)',
          background: 'rgba(0,0,0,0.8)',
        }}
      >
        <div className="draggable-handle text-yellow-100 flex w-full  " style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'move',
          padding: '8px',
          backgroundColor: 'black',
          // borderBottom: '1px solid #ccc'
        }}>
          <h1 style={{ margin: '0', padding: '0 8px' }}>Token Swap</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" onClick={toggleMinimize}>
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

        <Divider orientation='horizontal' className=' bg-gray-300 w-11/12 rounded-full' style={{ marginInline: 'auto' }} />

        {!isMinimized && (
          <Box padding={'1rem'}>
            {isFullscreen && <Box sx={{ flexGrow: 1 }}><Line data={chartData} /></Box>}
            <Box gap='1rem' display='flex' flexDirection='column'>
              <TokenSwapInput
                side="pay"
                onChange={handleInputChange}
                selectedToken={tokenA}
                onTokenSelect={(pump) => dispatch(setSelectedTokenA(pump))}
              // amount="~$3.3K"
              />

              <TokenSwapInput
                side="receive"
                onChange={handleInputChange}
                selectedToken={tokenB}
                onTokenSelect={(pump) => dispatch(setSelectedTokenB(pump))}
              // amount="~$3.3K"
              />

              <TokenSwapAnalytic />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSwap}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4   rounded-full"
                style={{ borderRadius: '50px', padding: '.6rem' }}
              >
                Swap
              </Button>
            </Box>
            {error && <p>Error: {error}</p>}
          </Box>
        )}
      </Box>
    </Draggable>
  );
};


export default TokenswapStack