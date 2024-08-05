import { Box, Button, Tab } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setPumpChartShown } from "../../libs/redux/slices/pump-chart-slice";
import { ArrowBack } from "@mui/icons-material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { motion } from 'framer-motion';
import { setSelectedtokenToReceive } from "../../libs/redux/slices/token-swap-slice";
import TelegramButton from "../buttons/TelegramButton";
import XButton from "../buttons/XButton";
import WebsiteButton from "../buttons/WebsiteButton";
import PumpfunButton from "../buttons/PumpfunButton";
import React, { useState } from "react";
import PumpHolders from "./PumpHolders";
import PumpStats from "./PumpStats";
import PumpChartEmbed from "./PumpChartEmbed";

export default function PumpChart() {

    const pumpItem = useAppSelector(state => state.pumpChart.pumpItem);
    const theme = useAppSelector(state => state.theme.current.styles);
    const dispatch = useAppDispatch();
    const atClickBuy = () => dispatch(setSelectedtokenToReceive(pumpItem));
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event
        setValue(newValue);
    };

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
            className='gap-4 grid lg:grid-cols-3 max-lg:flex max-lg:flex-col overflow-auto max-lg:h-full no-scrollbar '
        >
            <Box className="md:col-span-2 flex flex-col gap-4 h-max ">
                <Box className="w-full grid grid-cols-3 sm:p-4 h-max sm:border border-gray-500  max-sm:flex max-sm:flex-col " >
                    <div className="flex items-center gap-2 col-span-2 max-w-[100%]  overflow-hidden">
                        <Box className="relative hover:cursor-pointer z-10">
                            <Box className="relative flex items-center z-[-2]" sx={{ width: 66, height: 66 }}>
                                <img src={pumpItem?.logo} style={{ aspectRatio: '1/1' }} alt="Token Image" className="aspect-square rounded-full" />
                            </Box>
                        </Box>
                        <div className="flex flex-col gap-1 max-w-[100%]">
                            <p className="text-[16px] max-sm:text-[12px] whitespace-nowrap max-lg:overflow-hidden text-ellipsis">
                                {pumpItem?.symbol} ({pumpItem?.name})
                            </p>
                            <p title={pumpItem?.social_links.description} className="text-[11px] max-sm:text-[9px] whitespace-nowrap  overflow-hidden    w-[80%] text-ellipsis">
                                {pumpItem?.social_links.description}
                            </p>
                        </div>
                    </div>
                    <Box alignItems='flex-end' className="flex flex-col gap-1 max-sm:mt-4 max-sm:p-2 max-sm:flex-row   max-sm:flex max-sm:justify-between col-span-1 justify-center align-middle max-sm:border border-gray-500 ">
                        <Box display='flex' alignItems='center' gap='.3rem'>
                            <TelegramButton url={pumpItem?.social_links?.telegram} />
                            <XButton url={`${pumpItem?.social_links.twitter_username ? 'https://x.com/' + pumpItem?.social_links.twitter_username : undefined}`} />
                            <WebsiteButton url={pumpItem?.social_links?.website} />
                        </Box>
                        <Box display='flex' alignItems='center' gap='.3rem'>
                            <PumpfunButton mintAddress={pumpItem?.address} />
                        </Box>
                    </Box>
                </Box>
                <Box className="w-full lg:h-[390px] overflow-hidden aspect-video sm:border border-gray-500" >
                    <PumpChartEmbed src={`https://gmgn.ai/sol/token/${pumpItem?.address}?embled=1`}    />
                </Box>
                <Box className="w-full">
                    <Box className="grid grid-cols-3 gap-4">
                        <Button variant="outlined" className="flex align-middle gap-2 justify-center"
                            style={{ alignItems: 'center', borderRadius: 0, overflow: 'hidden', color: theme.textColor, borderColor: theme.textColor, }}
                            onClick={() => dispatch(setPumpChartShown(false))}>
                            <ArrowBack /> Back
                        </Button>
                        <Button style={{ color: theme.buttonColor, background: theme.textColor }} disableElevation variant="contained" className="flex col-span-2 align-middle gap-2 justify-center" onClick={atClickBuy}>
                            Buy
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box className="p-4 md:col-span-1 lg:w-full lg:h-full border-gray-500 border " borderBottom={0} >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value} >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} centered >
                                <Tab label="Token info" value="1" style={{ color: theme.textColor, flexGrow: 1 }} />
                                <Tab label="Holders" value="2" style={{ color: theme.textColor, flexGrow: 1 }} />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <PumpStats />
                        </TabPanel>
                        <TabPanel value="2">
                            <PumpHolders />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </motion.div>
    );
}
