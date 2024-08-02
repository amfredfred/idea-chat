import { Box } from "@mui/material";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";


export default function PumpChart() {
    return (
       <Box className='gap-4 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1'>
            <div className="md:col-span-2 flex flex-col gap-4">
                <div className="w-full bg-red-50 lg:h-[96px] rounded-lg overflow-hidden">
                    HED
                </div>
                <div className="w-full bg-red-50 lg:h-[390px] rounded-lg overflow-hidden">
                    <AdvancedRealTimeChart theme="dark" autosize />
                </div>
                <div className="w-full lg:h-[40px] bg-red-50 rounded-lg overflow-hidden">
                    HELLO WORLD
                </div>
            </div>
            <div className="bg-zinc-950 rounded-lg overflow-hidden md:col-span-1 lg:w-full lg:h-full">
                HELL WOEL
            </div>
        </Box>
    )
}
