import { useRecoilValue } from "recoil";
import { websiteThemeState } from "../../atoms/website-theme";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { IChatStates } from "../../common/types";
import { setChatState } from "../../libs/redux/slices/settings-slice";

const Footer = () => {
  const websiteTheme = useRecoilValue(websiteThemeState);

  const dispacth = useAppDispatch()
  const chatState = useAppSelector(state => state.settings.chat.state)
  const updateChatState = (state: IChatStates) => dispacth(setChatState(state))

  return (
    <div className="mx-auto   ">

      <div
        className={`h-[32px] w-full bg-white rounded-[4px] flex justify-between items-center p-[2px] pl-[2px] pr-[2px] ${websiteTheme.bgColor === "#ffffff" && "border border-black"
          }`}
      >
        <div
          style={{
            backgroundColor:
              chatState === "DEN" ? websiteTheme.bgColor : "#ffffff",
            color: chatState === "DEN" ? websiteTheme.textColor : "#000000",
          }}
          onClick={() => updateChatState("DEN")}
          className={` uppercase text-[14px]  h-[30px] w-[90px] flex items-center justify-center rounded-[2px]`}
        >
          den
        </div>
        <div
          style={{
            backgroundColor:
              chatState === "PUMP" ? websiteTheme.bgColor : "#ffffff",
            color: chatState === "PUMP" ? websiteTheme.textColor : "#000000",
          }}
          onClick={() => updateChatState("PUMP")}
          className={` uppercase text-[14px] ml-[25px] h-[30px] w-[90px] flex items-center justify-center rounded-[2px]  `}
        >
          PUMP
        </div>
        <div
          style={{
            backgroundColor:
              chatState === "ALPHA" ? websiteTheme.bgColor : "#ffffff",
            color: chatState === "ALPHA" ? websiteTheme.textColor : "#000000",
          }}
          onClick={() => updateChatState("ALPHA")}
          className={` uppercase text-[14px] ml-[25px] h-[30px] w-[90px] flex items-center justify-center rounded-[2px]`}
        >
          alpha
        </div>
      </div>
    </div>
  );
};

export default Footer;
