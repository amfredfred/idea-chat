import React, { useEffect, useRef } from 'react';
import { Grid, Button, Collapse, CircularProgress, Skeleton, Box } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyIcon from '@mui/icons-material/Money';
import { useAppSelector } from '../../libs/redux/hooks';
import { SwipeDown } from '@mui/icons-material';
import { formatNumber } from '../../utils/format';
import { parseEther } from '../../utils';
import TokenRateRefreshAndStatus from './TokenRateRefreshAndStatus';

const TokenSwapAnalytic = () => {
    const [open, setOpen] = React.useState(false);
    const tsacref = useRef<HTMLDivElement>(null);
    const theme = useAppSelector(state => state.theme.current.styles)

    const {
        tokenToSend,
        tokenToReceive,
        fetchTokenRateState,
        conversionRate,
        quoteResponse,
        fetchQuoteState
    } = useAppSelector(state => state.tokenSwap);

    const handleClickOutside = (event: MouseEvent) => {
        if (tsacref.current && !tsacref.current.contains(event.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const skeletonLoading = <Skeleton style={{ borderRadius: '50px' }} variant="rectangular" width={50} height={18} />;
    const maxToPay = parseEther(Number(quoteResponse?.inAmount || 0), Number(tokenToSend?.decimals || 0));

    const priceImpactColor = () => {
        if (Number(quoteResponse?.priceImpactPct) > 0.1) return 'red';
        if (Number(quoteResponse?.priceImpactPct) < 0.1) return 'grey';
        return 'green';
    };

    return (
        <div
            style={{ color: theme.active_color, borderColor: theme.active_color }}
            ref={tsacref}
            className="text-white w-full   p-2 rounded-lg text-xs border ">
            <Button
                onClick={() => setOpen(!open)}
                className="border-b pb-2 mb-2 cursor-pointer w-full"
            >
                <Grid container alignItems="center" justifyContent="space-between">
                    <span className=' text-white text-xs '>
                        1 {tokenToSend?.symbol} = {fetchTokenRateState == 'pending' ? <CircularProgress size={12} /> : formatNumber(Number(conversionRate))} {tokenToReceive?.symbol}
                    </span>
                    <Box display='flex' alignItems='center' gap='.4rem'>
                        <SwipeDown fontSize='small' className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
                        <TokenRateRefreshAndStatus />
                    </Box>
                </Grid>
            </Button>

            <Collapse in={open}>
                <div className="space-y-4 p-2">
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <TrendingDownIcon fontSize='small' className="mr-2" />
                                <span>Price Impact</span>
                            </Grid>
                        </Grid>
                        <Grid item style={{ color: priceImpactColor(), fontWeight: 'bolder' }} display='flex'>
                            <strong>{(!quoteResponse?.priceImpactPct || fetchQuoteState == 'pending') ? skeletonLoading : formatNumber(quoteResponse.priceImpactPct)}</strong><strong>%</strong>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <AttachMoneyIcon fontSize='small' className="mr-2" />
                                <span>Max to pay</span>
                            </Grid>
                        </Grid>
                        <Grid item display='flex'>
                            <strong>{(!maxToPay || fetchQuoteState == 'pending') ? skeletonLoading : maxToPay} </strong>&nbsp;<strong>{tokenToSend?.symbol}</strong>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <MoneyIcon fontSize='small' className="mr-2" />
                                <span>Platform Fees</span>
                            </Grid>
                        </Grid>
                        <Grid item display='flex' >
                            <span>{(!quoteResponse?.platformFee?.amount || fetchQuoteState == 'pending') ? skeletonLoading : quoteResponse.platformFee.amount}</span>&nbsp;{quoteResponse.platformFee?.fee_currency}
                        </Grid>
                    </Grid>
                </div>
            </Collapse>
        </div>
    );
};

export default TokenSwapAnalytic;