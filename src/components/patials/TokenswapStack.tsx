import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { TextField, Button, MenuItem, Box, Container, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { setAmountToSwap, setSelectedTokenA, setSelectedTokenB, setLoading, setIsVisible } from '../../libs/redux/slices/token-swap-slice';
import { Line } from 'react-chartjs-2';
import { Fullscreen, FullscreenExit, Minimize, Close } from '@mui/icons-material';
import PayComponent from './PayComponent';

const TokenswapStack: React.FC = () => {
  const dispatch = useAppDispatch();
  const { amountToSwap, error, isVisible } = useAppSelector(state => state.tokenSwap);

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


  const currencies = [
    {
      value: 'BTC',
      label: 'Bitcoin',
    },
    {
      value: 'ETH',
      label: 'Ethereum',
    },
    // Add more currencies as needed
  ];


  return (
    <Draggable handle=".draggable-handle"  >
      <Box
        sx={{
          position: isFullscreen ? 'fixed' : 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isFullscreen ? '80vw' : 'auto',
          height: isFullscreen ? '80vh' : 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
          zIndex: 1000,
          border: '1px solid #ccc',
          borderRadius: '8px',
          // padding: isMinimized ? '0' : '16px',
          overflow: isMinimized ? 'hidden' : 'auto',
          display: isVisible ? 'flex' : 'none',
          flexDirection: 'column',
          background: 'red'
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
          <Box display='flex' gap='1rem'>
            {isFullscreen && <Box sx={{ flexGrow: 1 }}><Line data={chartData} /></Box>}
            <Container className="p-6 bg-white rounded-lg shadow-lg">

              <Box className="space-y-4">

                <PayComponent />

                <TextField
                  fullWidth
                  label="Amount"
                  variant="outlined"
                  value={amountToSwap}
                  onChange={(e) => dispatch(setAmountToSwap(Number(e.target.value)))}
                  className="mb-4"
                />
                <TextField
                  select
                  fullWidth
                  label="From"
                  value={amountToSwap}
                  onChange={(e) => dispatch(setSelectedTokenA(e.target.value))}
                  variant="outlined"
                  className="mb-4"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="To"
                  value={amountToSwap}
                  onChange={(e) => dispatch(setSelectedTokenB(e.target.value))}
                  variant="outlined"
                  className="mb-4"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
            </Container>
            {error && <p>Error: {error}</p>}
          </Box>
        )}
      </Box>
    </Draggable>
  );
};


export default TokenswapStack