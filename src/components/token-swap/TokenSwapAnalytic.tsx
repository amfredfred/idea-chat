import React, { useCallback, useEffect, useRef } from 'react';
import { Grid, Button, Collapse, Typography, CircularProgress, Skeleton } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyIcon from '@mui/icons-material/Money';
import { useAppDispatch, useAppSelector } from '../../libs/redux/hooks';
import { SwipeDown } from '@mui/icons-material';
import { fetchTokenRate } from '../../libs/redux/slices/token-swap-slice';
import { formatNumber } from '../../utils/format';
import { parseEther } from '../../utils';

const TokenSwapAnalytic = () => {
    const [open, setOpen] = React.useState(false);
    const tsacref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const {
        tokenToSend,
        tokenToReceive,
        isFetchingRate,
        conversionRate,
        quoteResponse,
        isFetchingQuoteSwap
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

    const fetchRate = useCallback(() => {
        if (tokenToSend?.address && tokenToReceive?.address) {
            dispatch(fetchTokenRate({ fromMint: tokenToSend.address, toMint: tokenToReceive.address }));
        }
    }, [dispatch, tokenToSend?.address, tokenToReceive?.address]);

    useEffect(() => {
        fetchRate();
    }, [fetchRate]);

    const skeletonLoading = <Skeleton style={{ borderRadius: '50px' }} variant="rectangular" width={50} height={18} />;
    const platformFee = formatNumber(parseEther(Number(quoteResponse?.platformFee?.amount || 0), Number(tokenToReceive?.decimals || 0)));
    const maxToPay = parseEther(Number(quoteResponse?.inAmount || 0), Number(tokenToSend?.decimals || 0));

    const priceImpactColor = () => {
        if (Number(quoteResponse?.priceImpactPct) > 0.1) return 'red';
        if (Number(quoteResponse?.priceImpactPct) < 0.1) return 'grey';
        return 'green';
    };

    return (
        <div ref={tsacref} className="text-white w-full bg-slate-700 p-2 rounded-lg text-xs">
            <Button
                onClick={() => setOpen(!open)}
                className="border-b pb-2 mb-2 cursor-pointer w-full text-white"
            >
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant='body2'>
                            1 {tokenToSend?.symbol} = {isFetchingRate ? <CircularProgress size={12} /> : formatNumber(Number(conversionRate))} {tokenToReceive?.symbol}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <SwipeDown fontSize='small' className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
                    </Grid>
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
                        <Grid item style={{ color: priceImpactColor(), fontWeight: 'bolder' }}>
                            <strong>{(!quoteResponse?.priceImpactPct || isFetchingQuoteSwap) ? skeletonLoading : formatNumber(quoteResponse.priceImpactPct)}</strong><strong>%</strong>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <AttachMoneyIcon fontSize='small' className="mr-2" />
                                <span>Max to pay</span>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <strong>{(!maxToPay || isFetchingQuoteSwap) ? skeletonLoading : maxToPay} </strong>&nbsp;<strong>{tokenToSend?.symbol}</strong>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <MoneyIcon fontSize='small' className="mr-2" />
                                <span>Platform Fees</span>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <span>{(!quoteResponse?.platformFee?.amount || isFetchingQuoteSwap) ? skeletonLoading : platformFee}</span>&nbsp;{tokenToReceive?.symbol}
                        </Grid>
                    </Grid>
                </div>
            </Collapse>
        </div>
    );
};

export default TokenSwapAnalytic;