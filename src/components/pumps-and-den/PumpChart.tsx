import { Box, Button, Divider, Tab } from "@mui/material";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setPumpChartShown } from "../../libs/redux/slices/pump-chart-slice";
import { ArrowBack } from "@mui/icons-material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { motion } from 'framer-motion'
import { setSelectedtokenToReceive } from "../../libs/redux/slices/token-swap-slice";
import TelegramButton from "../buttons/TelegramButton";
import XButton from "../buttons/XButton";
import WebsiteButton from "../buttons/WebsiteButton";
import PumpfunButton from "../buttons/PumpfunButton";
import React, { useState } from "react";
import { shortenString } from "../../utils";
import { formatNumber } from "../../utils/format";

export default function PumpChart() {

    const pumpItem = useAppSelector(state => state.pumpChart.pumpItem)
    const theme = useAppSelector(state => state.theme.current.styles)
    const dispatch = useAppDispatch()
    const atClickBuy = () => dispatch(setSelectedtokenToReceive(pumpItem))


    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const InfoItem = ({ left, right }: { left: string, right: string }) =>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Box>
                {left}
            </Box>
            <Box>
                {right}
            </Box>
        </Box>

    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
            className='gap-4 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1'>
            <Box className="md:col-span-2 flex flex-col gap-4">
                <Box className="w-full    grid grid-cols-3  p-4  overflow-hidden" border='solid thin white' >
                    <div className="flex items-center gap-2 col-span-2">
                        <Box className="relative hover:cursor-pointer z-10 ">
                            <Box className="relative flex items-center z-[-2]" sx={{ width: 66, height: 66 }}>
                                <img src={pumpItem?.logo} style={{ aspectRatio: '1/1' }} alt="Token Image" className=" aspect-square rounded-full   " height="100%" />
                            </Box>
                        </Box>
                        <div className=" flex flex-col gap-1">
                            <p className=" text-[16px] max-sm:text-[12px] whitespace-nowrap overflow-hidden text-ellipsis max-[100%]">
                                {pumpItem?.symbol} ({pumpItem?.name})
                            </p>
                            <p title={pumpItem?.description ?? `Bonding Curve Progress ${Number(pumpItem?.progress ?? 0) * 100}%`}
                                className=" text-[11px] max-sm:text-[9px]  whitespace-nowrap overflow-hidden max-w-[50%] text-ellipsis">
                                {pumpItem?.description ?? `Bonding Curve Progress ${Number(pumpItem?.progress ?? 0) * 100}%`}
                            </p>
                        </div>
                    </div>
                    <Box alignItems='flex-end' className=" flex flex-col gap-1 col-span-1 justify-center align-middle" >
                        <Box display='flex' alignItems='center' gap='.3rem'>
                            <TelegramButton url={pumpItem?.telegram} />
                            <XButton url={pumpItem?.twitter} />
                            <WebsiteButton url={pumpItem?.website} />
                        </Box>
                        <Box display='flex' alignItems='center' gap='.3rem'>
                            <PumpfunButton mintAddress={pumpItem?.address} />
                        </Box>
                    </Box>
                </Box>
                <Box className="w-full lg:h-[390px]   overflow-hidden aspect-video" border='solid thin white' >
                    <AdvancedRealTimeChart theme="dark" autosize />
                </Box>
                <Box className="w-full ">
                    <Box className="grid grid-cols-3 gap-4">
                        <Button variant="outlined" className="flex align-middle gap-2 justify-center" onClick={() => dispatch(setPumpChartShown(false))}>
                            <ArrowBack /> BAck
                        </Button>
                        <Button variant="contained" className="flex col-span-2 align-middle gap-2 justify-center" onClick={atClickBuy}>
                            Buy
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box className="p-4  overflow-hidden md:col-span-1 lg:w-full lg:h-full" border='solid thin white' borderBottom='none'>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Token info" value="1" style={{ color: theme.textColor }} />
                                <Tab label="holders" value="2" style={{ color: theme.textColor }} />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box display='flex' className=' flex-col  gap-4'>
                                <InfoItem left="ADDRESS" right={shortenString(String(pumpItem?.address))} />
                                <Divider />
                                <InfoItem left="PRICE" right={`$${formatNumber(pumpItem?.price ?? 0)}`} />
                                <Divider />
                                <InfoItem left="MCAP" right={`$${formatNumber(pumpItem?.usd_market_cap ?? 0)}`} />
                                <Divider />
                                <InfoItem left="LIQUIDITY" right={formatNumber(Number(pumpItem?.total_supply))} />
                                <Divider />
                                <InfoItem left="VOLUME  1H" right={`${formatNumber(pumpItem?.volume_1h ?? 0)}`} />
                                <Divider />
                                <InfoItem left="HOLDERS" right={`${formatNumber(pumpItem?.holder_count ?? 0)}`} />
                                <Divider />
                                <InfoItem left="DEV" right="LOCKED" />
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </motion.div>
    )
}