import { websiteThemeState } from "../../atoms/website-theme";
import { useRecoilValue } from "recoil";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setSelectedtokenToReceive } from "../../libs/redux/slices/token-swap-slice";
import { formatNumber } from "../../utils/format";
import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { CandlestickChartRounded } from "@mui/icons-material";
import { fetchHistoricalData } from "../../libs/redux/slices/pump-chart-slice";
import { IPumpToken } from "../../common/types";

export default function PumpCard(pump: IPumpToken) {
  const websiteTheme = useRecoilValue(websiteThemeState);

  // const pumpProgress = pump?.progress?.toFixed?.(1)
  const dispatch = useAppDispatch()
  const atClickBuy = () => dispatch(setSelectedtokenToReceive(pump))
  const atClickApeBlindly = () => { console.log('atApeBlindly') }
  const pumpChartStatus = useAppSelector(state => state.pumpChart.status);
  const pumpItem = useAppSelector(state => state.pumpChart.pumpItem)

  const handleLoadAndShowChart = () => {
    dispatch(fetchHistoricalData(pump.address))
  }

  return (
    <div
      className="border-[1px] rounded-[4px] border-white font-jbm w-full mx-auto isolate "
      style={{
        borderColor: websiteTheme.textColor,
        color: websiteTheme.textColor,
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

        <LinearProgress variant="determinate" style={{ color: '#00FF00', height: '1rem', borderRadius: '50px' }} value={Number(pump?.progress ?? 1) * 100} />

        <div className=" flex justify-between w-[100%] mx-auto">
          <div className=" flex flex-col  text-center">
            <p className=" text-[12px] ">mcap</p>
            <p className=" text-[16px] ">${formatNumber(pump?.marketCap)}</p>
          </div>
          <div className=" flex flex-col  text-center">
            <p className=" text-[12px] ">holders</p>
            <p className=" text-[16px] ">{formatNumber(pump?.holdersCount ?? 0)}</p>
          </div>
          <div className=" flex flex-col  text-center">
            <p className=" text-[12px] ">volume</p>
            <p className=" text-[16px] ">${formatNumber(pump?.marketTradingVolume) ?? 0}</p>
          </div>
          <div className=" flex flex-col  text-center">
            <p className=" text-[12px] ">dev</p>
            {/* <p className=" text-[16px] ">{ pump?.}</p> */}
          </div>
        </div>

        <div
          className=" h-[1px] w-[100%] mx-auto"
          style={{
            background: `linear-gradient(to right, ${websiteTheme.bgColor}, ${websiteTheme.textColor}, ${websiteTheme.bgColor})`,
          }}
        />

        <Box display='flex' gap='1rem' alignItems='center' justifyContent='space-between'>
          <Button onClick={handleLoadAndShowChart}

            // disabled={pumpChartStatus === 'pending'}

            className=' bg-red-400 flex' variant="outlined"
            style={{ alignItems: 'center', borderRadius: 0, justifyContent: 'space-between', overflow: 'hidden' }} >
            Chart  {pumpItem?.address == pump.address && pumpChartStatus == 'pending' ? <CircularProgress size={24} thickness={10} /> : <CandlestickChartRounded className='text-yellow-100' />}
          </Button>
          <Button onClick={Number(pump?.progress ?? 1) >= 1 ? atClickBuy : atClickApeBlindly} title="Hello wolr" variant="contained" style={{ borderRadius: 0, flexGrow: 1, boxShadow: 'none' }} >
            {Number(pump?.progress ?? 1) >= 1 ? 'Buy' : 'APE BLINDLY'}
          </Button>
        </Box>
      </div>
    </div>
  );
}