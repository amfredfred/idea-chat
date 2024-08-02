import { Box, Button } from "@mui/material";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setPumpChartShown } from "../../libs/redux/slices/pump-chart-slice";
import { ArrowBack } from "@mui/icons-material";
import { motion } from 'framer-motion'
import { setSelectedtokenToReceive } from "../../libs/redux/slices/token-swap-slice";

export default function PumpChart() {

    const pumpItem = useAppSelector(state => state.pumpChart.pumpItem)
    const dispatch = useAppDispatch()
    const atClickBuy = () => dispatch(setSelectedtokenToReceive(pumpItem))

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
                <Box className="w-full p-4  bg-zinc-950 lg:h-[96px] rounded-lg overflow-hidden">
                    HED
                </Box>
                <Box className="w-full bg-zinc-950 lg:h-[390px] rounded-lg overflow-hidden">
                    <AdvancedRealTimeChart theme="dark" autosize />
                </Box>
                <Box className="w-full p-2   bg-zinc-950 rounded-lg overflow-hidden">
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
            <Box className="bg-zinc-950 rounded-lg p-4  overflow-hidden md:col-span-1 lg:w-full lg:h-full">

            </Box>
        </motion.div>
    )
}