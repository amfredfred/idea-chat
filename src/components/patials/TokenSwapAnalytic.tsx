// TokenSwapAnalytic.js

import React from 'react';
import { Grid, Button, Collapse } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyIcon from '@mui/icons-material/Money';
import { useAppSelector } from '../../libs/redux/hooks';
import { ArrowDownward } from '@mui/icons-material';

const TokenSwapAnalytic = () => {
    const [open, setOpen] = React.useState(false);

    const amountToSwap = useAppSelector(state => state.tokenSwap.amountToSwap)
    const tokenFrom = useAppSelector(state => state.tokenSwap.tokenA)
    const tokenTo = useAppSelector(state => state.tokenSwap.tokenB)

    return (
        <div className="  text-white w-full bg-slate-700 p-2  rounded-lg text-xs">
            <Button
                onClick={() => setOpen(!open)}
                className="border-b pb-2 mb-2 cursor-pointer w-full">
                <Grid container item alignItems="center" justifyContent="space-between" direction='row' display='flex'>
                    <Grid item >
                        <Grid container alignItems="center">
                            <span>1 DAI = 0.0002990434 WETH</span>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container alignItems="center">
                            <TrendingDownIcon className="mr-2" />
                            <span>0.19%</span>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                    <ArrowDownward className={`transform transition-transform ${open ? 'rotate-180' : ''}`} />
                </Grid>
            </Button>

            <Collapse in={open}>
                <div className="space-y-4 p-2">
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <AltRouteIcon className="mr-2" />
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
                                <TrendingDownIcon className="mr-2" />
                                <span>Price Impact</span>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <span>0.19%</span>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <AttachMoneyIcon className="mr-2" />
                                <span>Max to pay</span>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <span>1.0070 WETH</span>
                        </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Grid container alignItems="center">
                                <MoneyIcon className="mr-2" />
                                <span>Network Fees</span>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <span>0.01 ETH</span>
                        </Grid>
                    </Grid>
                </div>
            </Collapse>
        </div>
    );
};

export default TokenSwapAnalytic;