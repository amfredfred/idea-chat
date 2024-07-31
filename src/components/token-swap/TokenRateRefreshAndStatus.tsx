import { useCallback, useEffect, useState } from "react";
import { parseAmount } from '../../utils';
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { fetchQuoteSwap, setAmountToReceive } from '../../libs/redux/slices/token-swap-slice';
import { Box, CircularProgress } from "@mui/material";

export default function TokenRateRefreshAndStatus() {
  const [initCountdown,] = useState(10) //setInitCountdown
  const [timeTillRefetch, setTimeTillRefetch] = useState<number>(initCountdown);

  const dispatch = useAppDispatch();

  const { tokenToSend, tokenToReceive, amountToSend, settings } = useAppSelector(state => state.tokenSwap);

  const fetchRate = useCallback(() => {
    if (tokenToSend?.address && tokenToReceive?.address && amountToSend) {
      dispatch(fetchQuoteSwap({
        fromMint: tokenToSend.address,
        toMint: tokenToReceive.address,
        amount: parseAmount(amountToSend, tokenToSend.decimals),
        settings
      }));
    } else {
      dispatch(setAmountToReceive(0));
    }
  }, [dispatch, tokenToSend, tokenToReceive, amountToSend, settings]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchRate();
    }, 800); // Debounce duration

    return () => clearTimeout(timeoutId);
  }, [fetchRate, amountToSend]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTillRefetch(prev => {
        if (prev === 1) {
          fetchRate();
          return initCountdown;
        }
        const count = prev > 0 ? prev - 1 : 0
        return count;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchRate, initCountdown]);

  return (
    <Box display='flex' alignItems='ceter' justifyContent='space-between' paddingInline='1rem'>
      <Box>Time till refetch: {timeTillRefetch} seconds</Box>
      <CircularProgress variant="determinate" size={17} value={((initCountdown - timeTillRefetch) / initCountdown) * 100} />
    </Box>
  );
}
