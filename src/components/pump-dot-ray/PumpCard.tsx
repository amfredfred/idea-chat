import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setSelectedtokenToReceive } from "../../libs/redux/slices/token-swap-slice";
import { formatNumber } from "../../utils/format";
import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { CandlestickChartRounded } from "@mui/icons-material";
import { fetchPumpTokenDetails, setPumpTokenItem } from "../../libs/redux/slices/pump-chart-slice";
import { PumpTokenItem } from "../../common/types";
import TelegramButton from "../buttons/TelegramButton";
import WebsiteButton from "../buttons/WebsiteButton";
import PumpfunButton from "../buttons/PumpfunButton";
import XButton from "../buttons/XButton";
import JupiterButton from "../buttons/JupiterButton";
import DexScreenerButton from "../buttons/DexScreenerButton";
import DexToolButton from "../buttons/DexToolButton";
import SolanaButton from "../buttons/SolanaButton";

export default function PumpCard(pump: PumpTokenItem) {
  const theme = useAppSelector(state => state.theme.current.styles);
  const dispatch = useAppDispatch()
  const atClickBuy = () => dispatch(setSelectedtokenToReceive(pump))
  const pumpChartStatus = useAppSelector(state => state.pumpChart.status);
  const pumpItem = useAppSelector(state => state.pumpChart.pumpItem)

  const handleLoadAndShowChart = () => {
    dispatch(setPumpTokenItem(pump))
    dispatch(fetchPumpTokenDetails(pump.address))
  }

  return (
    <div
      className="border-[1px] rounded-[4px] border-white font-jbm w-full mx-auto isolate "
      style={{
        borderColor: theme.text_color,
        color: theme.text_color,
      }}
    >
      <div className=" flex flex-col gap-[20px] p-[10px] ">
        <div className="flex items-center gap-2">
          <Box className="relative hover:cursor-pointer z-10">
            <Box className="flex items-center">
              <Box className="relative flex items-center z-[-2]" sx={{ width: 66, height: 66 }}>
                <img src={pump?.logo} style={{ aspectRatio: '1/1' }} alt="Token Image" className=" aspect-square rounded-full" height="100%" />
              </Box>
            </Box>
          </Box>
          <div className=" flex flex-col gap-1">
            <p className=" text-[16px]">{pump.name}</p>
            <p className=" text-[12px]">22 mins ago</p>
          </div>
        </div>

        <LinearProgress variant="determinate" style={{ background: theme.text_color, height: '1rem', borderRadius: '50px', border: 'solid thin' }} value={Number(pump?.price ?? 1) * 100} />

        <div className=" flex justify-between w-[100%] mx-auto">
          <div className=" flex flex-col  text-center">
            <p className=" text-[12px] ">mcap</p>
            <p className=" text-[16px] ">${formatNumber(pump?.market_cap)}</p>
          </div>
          <div className=" flex flex-col  text-center">
            <p className=" text-[12px] ">holders</p>
            <p className=" text-[16px] ">{formatNumber(pump?.holder_count ?? 0)}</p>
          </div>
          <div className=" flex flex-col  text-center">
            <p className=" text-[12px] ">volume</p>
            <p className=" text-[16px] ">${formatNumber(pump?.buy_volume_24h) ?? 0}</p>
          </div>
          <div className=" flex flex-col  text-center">
            <p className=" text-[12px] ">liquidity</p>
            <p className=" text-[16px] ">${formatNumber(pump.liquidity)}</p>
          </div>
        </div>

        <div
          className=" h-[1px] w-[100%] mx-auto"
          style={{
            background: `linear-gradient(to right, ${theme.bgColor}, ${theme.text_color}, ${theme.bgColor})`,
          }}
        />

        <Box className=' flex justify-between items-center '>
          <Box display='flex' alignItems='center' gap='.3rem'>
            <TelegramButton url={pump?.social_links?.telegram} />
            <XButton username={`${pump?.social_links.twitter_username}`} />
            <WebsiteButton url={pump?.social_links?.website} />
          </Box>
          <Box display='flex' alignItems='center' gap='.3rem'>
            <DexScreenerButton mintAddress={pump?.address} />
            <DexToolButton mintAddress={pump?.address} />
            <JupiterButton mintAddress={pump?.address} />
            <PumpfunButton mintAddress={pump?.address} />
            <SolanaButton mintAddress={pump?.address} />
          </Box>
        </Box>

        <div
          className=" h-[1px] w-[100%] mx-auto"
          style={{
            background: `linear-gradient(to right, ${theme.bgColor}, ${theme.text_color}, ${theme.bgColor})`,
          }}
        />

        <Box display='flex' gap='1rem' alignItems='center' justifyContent='space-between'>
          <Button onClick={handleLoadAndShowChart}
            disabled={pumpChartStatus === 'pending'}
            className='flex' variant="outlined"
            style={{ alignItems: 'center', borderRadius: 0, justifyContent: 'space-between', overflow: 'hidden', color: theme.text_color, borderColor: theme.text_color, }} >
            Chart  {pumpItem?.address == pump.address && pumpChartStatus == 'pending' ? <CircularProgress size={24} thickness={10} /> : <CandlestickChartRounded className='text-yellow-100' />}
          </Button>
          <Button onClick={atClickBuy} title="Buy" variant="contained" style={{ borderRadius: 0, flexGrow: 1, boxShadow: 'none', background: theme.text_color, color: theme.bgColor }} >
            Buy
          </Button>
        </Box>
      </div>
    </div>
  );
}