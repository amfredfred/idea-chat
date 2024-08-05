import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setSelectedtokenToReceive } from "../../libs/redux/slices/token-swap-slice";
import { formatNumber } from "../../utils/format";
import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { CandlestickChartRounded } from "@mui/icons-material";
import { fetchPumpTokenDetails, setPumpTokenItem } from "../../libs/redux/slices/pump-chart-slice";
import { PumpTokenItem } from "../../common/types";

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
        borderColor: theme.textColor,
        color: theme.textColor,
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

        <LinearProgress  variant="determinate" style={{ background: theme.textColor, height: '1rem', borderRadius: '50px', border:'solid thin' }} value={Number(pump?.price ?? 1) * 100} />

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
            <p className=" text-[12px] ">dev</p>
            {/* <p className=" text-[16px] ">{ pump?.}</p> */}
          </div>
        </div>

        <div
          className=" h-[1px] w-[100%] mx-auto"
          style={{
            background: `linear-gradient(to right, ${theme.bgColor}, ${theme.textColor}, ${theme.bgColor})`,
          }}
        />

        <Box display='flex' gap='1rem' alignItems='center' justifyContent='space-between'>
          <Button onClick={handleLoadAndShowChart}

            // disabled={pumpChartStatus === 'pending'}

            className='flex' variant="outlined"
            style={{ alignItems: 'center', borderRadius: 0, justifyContent: 'space-between', overflow: 'hidden', color: theme.textColor, borderColor: theme.textColor, }} >
            Chart  {pumpItem?.address == pump.address && pumpChartStatus == 'pending' ? <CircularProgress size={24} thickness={10} /> : <CandlestickChartRounded className='text-yellow-100' />}
          </Button>
          <Button onClick={atClickBuy} title="Buy" variant="contained" style={{ borderRadius: 0, flexGrow: 1, boxShadow: 'none', background: theme.textColor,color:theme.bgColor }} >
            Buy
          </Button>
        </Box>
      </div>
    </div>
  );
}