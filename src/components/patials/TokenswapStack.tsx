import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Button, Box, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { setLoading, setIsVisible } from '../../libs/redux/slices/token-swap-slice';
import { Line } from 'react-chartjs-2';
import { Fullscreen, FullscreenExit, Minimize, Close } from '@mui/icons-material';
import TokenSwapInput from './TokenSwapInput';

const TokenswapStack: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, isVisible, tokenA, tokenB } = useAppSelector(state => state.tokenSwap);

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

  const tokens = Array.from({ length: 10 }).fill({ symbol: 'Token Symbol', logo: 'https://img.icons8.com/?size=48&id=IhWBOFHtv6vx&format=png' }) as any

  const handleInputChange = (value: any) => {
    console.log({ value })
  }

  const handleTokenSelect = (token_selected: any) => {
    console.log({ token_selected })
  }

  console.log({ tokenB, tokenA})

  return (
    <Draggable handle=".draggable-handle"  >
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
          borderRadius: '8px',
          overflow: isMinimized ? 'hidden' : 'auto',
          display: isVisible ? 'flex' : 'none',
          flexDirection: 'column',
          backdropFilter: 'blur(50px)',
          background: 'rgba(0,0,0,0.4)'
        }}
      >
        <div className="draggable-handle" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'move', padding: '8px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <h1 style={{ margin: '0', padding: '0 8px' }}>Token Swap</h1>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small" onClick={toggleMinimize}>
              <Minimize />
            </IconButton>
            <IconButton size="small" onClick={toggleFullscreen}>
              {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
            <IconButton size="small" onClick={closeWindow}>
              <Close />
            </IconButton>
          </div>
        </div>

        {!isMinimized && (
          <Box padding={'1rem'}>
            {isFullscreen && <Box sx={{ flexGrow: 1 }}><Line data={chartData} /></Box>}
            <Box gap='.6rem' display='flex' flexDirection='column'>
              <TokenSwapInput
                side="pay"
                onChange={handleInputChange}
                tokens={tokens}
                selectedToken={tokenA}
                onTokenSelect={handleTokenSelect}
              // amount="~$3.3K"
              />

              <TokenSwapInput
                side="receive"
                onChange={handleInputChange}
                tokens={tokens}
                selectedToken={tokenB}
                onTokenSelect={handleTokenSelect}
              // amount="~$3.3K"
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSwap}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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