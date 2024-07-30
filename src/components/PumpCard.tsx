import { DegenPill, JokerIcon } from "./Icons";
import { websiteThemeState } from "../atoms/website-theme";
import { useRecoilValue } from "recoil";
import { IPumpCoin, IPumpCoinMigrated } from "../common/types";
import { useAppDispatch } from "../libs/redux/hooks";
import { setSelectedtokenToReceive } from "../libs/redux/slices/token-swap-slice";
import { formatNumber } from "../utils/format";

export default function PumpCard(pump: IPumpCoin | IPumpCoinMigrated) {
  const websiteTheme = useRecoilValue(websiteThemeState);

  const pumpProgress = pump?.progress?.toFixed?.(1)
  const dispatch = useAppDispatch()
  const onClickCard = () => dispatch(setSelectedtokenToReceive(pump))

  return (
    <div className=" w-full h-[75%] normal-case  pt-[100px] flex flex-col gap-[40px]">
      <div
        className=" border-[1px] rounded-[4px] border-white font-jbm w-[90%] mx-auto "
        style={{
          borderColor: websiteTheme.textColor,
          color: websiteTheme.textColor,
        }}
      >
        <div className=" flex flex-col gap-[20px] p-[10px] ">
          <div className="flex items-center gap-2">
            <JokerIcon />
            <div className=" flex flex-col gap-1">
              <p className=" text-[16px]">fuck tate</p>
              <p className=" text-[12px]">22 mins ago</p>
            </div>
          </div>
          <div className=" bg-white rounded-[200px] h-[20px]  w-[100%]   mx-auto ">
            <div className=" bg-[#00FF00] w-[70%] h-full  rounded-[200px]" />
          </div>

          <div className=" flex justify-between w-[100%] mx-auto">
            <div className=" flex flex-col  text-center">
              <p className=" text-[12px] ">mcap</p>
              <p className=" text-[16px] ">${formatNumber(pump?.usd_market_cap)}</p>
            </div>
            <div className=" flex flex-col  text-center">
              <p className=" text-[12px] ">holders</p>
              <p className=" text-[16px] ">420</p>
            </div>
            <div className=" flex flex-col  text-center">
              <p className=" text-[12px] ">volume</p>
              <p className=" text-[16px] ">$240K</p>
            </div>
            <div className=" flex flex-col  text-center">
              <p className=" text-[12px] ">dev</p>
              <p className=" text-[16px] ">sold</p>
            </div>
          </div>

          <div
            className=" h-[1px] w-[100%] mx-auto"
            style={{
              background: `linear-gradient(to right, ${websiteTheme.bgColor}, ${websiteTheme.textColor}, ${websiteTheme.bgColor})`,
            }}
          />
          <div
            className="w-[100%] mx-auto flex items-center justify-center p-[8px] cursor-pointer"
            style={{
              backgroundColor: websiteTheme.textColor,
              color: websiteTheme.bgColor,
            }}
          >
            APE BLINDLY
          </div>
        </div>
      </div>
      <div
        className=" flex flex-col gap-[10px]"
        style={{
          color: websiteTheme.textColor,
        }}
      >
        <p className=" uppercase  text-center w-[60%] mx-auto">
          buy high-quality retarded tokens from pumpfun
        </p>
        <div className=" w-full flex justify-center">
          <DegenPill />
        </div>
        <p className=" text-center uppercase opacity-80">cuming soon</p>
      </div>
    </div>
  );
}