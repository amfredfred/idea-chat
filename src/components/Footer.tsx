import { useRecoilValue } from "recoil";
import { websiteThemeState } from "../atoms/website-theme";

const Footer = ({
  chatState,
  setChatState,
}: {
  chatState: any;
  setChatState: any;
}) => {
  const websiteTheme = useRecoilValue(websiteThemeState);
  return (
    <div className="lg:hidden h-[8%] w-[75%] mx-auto   ">
      <div
        className={`h-[32px] w-full bg-white rounded-[4px] flex justify-between items-center p-[2px] pl-[2px] pr-[2px] ${
          websiteTheme.bgColor === "#ffffff" && "border border-black"
        }`}
      >
        <div
          style={{
            backgroundColor:
              chatState === "DEN" ? websiteTheme.bgColor : "#ffffff",
            color: chatState === "DEN" ? websiteTheme.textColor : "#000000",
          }}
          onClick={() => setChatState("DEN")}
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
          onClick={() => setChatState("PUMP")}
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
          onClick={() => setChatState("ALPHA")}
          className={` uppercase text-[14px] ml-[25px] h-[30px] w-[90px] flex items-center justify-center rounded-[2px]`}
        >
          alpha
        </div>
      </div>
    </div>
  );
};

export default Footer;
