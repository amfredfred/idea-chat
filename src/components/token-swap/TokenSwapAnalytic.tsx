import React, { useCallback, useEffect, useRef } from 'react';
import { Grid, Button, Collapse, Typography, CircularProgress, Skeleton } from '@mui/material';
import AltRouteIcon from '@mui/icons-material/AltRoute';
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
    const tsacref = useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch()

    const {
        amountToSend,
        amountToReceive,
        tokenToSend,
        tokenToReceive,
        isFetchingRate,
        isFetchingRateError,
        conversionRate,
        quoteResponse,
        isFetchingQuoteSwap
    } = useAppSelector(state => state.tokenSwap)


    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            if (event.target !== tsacref.current && !tsacref.current?.contains(event.target as any)) {
                setOpen(false)
            }
        })
        return document.removeEventListener('mousedown', () => { })
    }, [open, tsacref])

    const fetchRate = useCallback(() => {
        if (tokenToSend?.address && tokenToReceive?.address) {
            dispatch(fetchTokenRate({ fromMint: tokenToSend.address, toMint: tokenToReceive.address }));
        }
    }, [dispatch, tokenToSend?.address, tokenToReceive?.address]);

    useEffect(() => {
        fetchRate();
    }, [fetchRate]);


    const skeletonLoading = <Skeleton style={{ borderRadius: '50px' }} variant="rectangular" width={50} height={18} />
    const platformFee = formatNumber(parseEther(Number(quoteResponse?.platformFee?.amount), Number(tokenToReceive?.decimals)))

    const priceImpactColor = () => {
        if (Number(quoteResponse?.priceImpactPct) > .1) return 'red'
        else if (Number(quoteResponse?.priceImpactPct) < .1) return 'grey'
        else return 'green'
    }

    return (
        <div ref={tsacref} className="  text-white w-full bg-slate-700 p-2  rounded-lg text-xs">
            <Button
                onClick={() => setOpen(!open)}
                className="border-b pb-2 mb-2 cursor-pointer w-full text-white">
                <Grid container item alignItems="center" justifyContent="space-between" direction='row' display='flex'>
                    <Grid item >
                        <Grid container alignItems="center">
                            <Typography variant='body2'>1 {tokenToSend?.symbol} = {isFetchingRate ? <CircularProgress size={12} /> : formatNumber(Number(conversionRate))} {tokenToReceive?.symbol}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    <SwipeDown fontSize='small' className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
                </Grid>
            </Button>

            <Collapse in={open}>
                <div className="space-y-4 p-2">
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <AltRouteIcon fontSize='small' className="mr-2" />
                                <span>Order Routing</span>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <span>100% AugustusRFQ</span>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <TrendingDownIcon fontSize='small' className="mr-2" />
                                <span>Price Impact</span>
                            </Grid>
                        </Grid>
                        <Grid item display='flex' flexDirection='row' alignItems='center' style={{ color: priceImpactColor(), fontWeight: 'bolder' }}>
                            <strong>{(!quoteResponse?.priceImpactPct || isFetchingQuoteSwap) ? skeletonLoading : formatNumber(quoteResponse.priceImpactPct)}</strong><strong>%</strong>
                        </Grid>
                    </Grid>

                    {
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Grid container alignItems="center">
                                    <AttachMoneyIcon fontSize='small' className="mr-2" />
                                    <span>Max to pay</span>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <span>1.0070 WETH</span>
                            </Grid>
                        </Grid>
                    }

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <MoneyIcon fontSize='small' className="mr-2" />
                                <span>Platform Fees</span>
                            </Grid>
                        </Grid>
                        <Grid item display='flex' flexDirection='row' alignItems='center'>
                            <span>{(!quoteResponse?.platformFee?.amount || isFetchingQuoteSwap) ? skeletonLoading : platformFee}</span>&nbsp;{tokenToReceive?.symbol}
                        </Grid>
                    </Grid>
                </div>
            </Collapse>
        </div>
    );
};

export default TokenSwapAnalytic;