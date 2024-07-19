import { useRecoilValue } from "recoil";
import JeaIcon from "../assets/JeaIcon.svg";
import { websiteThemeState } from "../atoms/website-theme";

const Alpha = () => {
  const websiteTheme = useRecoilValue(websiteThemeState);
  return (
    <div
      className="h-[75%] w-full flex flex-col "
    >
      <div
        style={{ color: websiteTheme.textColor }}
        className="flex w-[90%] mx-auto mt-[50px] "
      >
        <div>
          <img src={JeaIcon} />
        </div>
        <div className="flex flex-col gap-[5px]  w-[90%] pl-[10px]">
          <p className="uppercase text-[14px]">alpha_hoe</p>
          <div className=" ">
            <p className=" uppercase text-[16px] break-words">FV56CmR7fhEyPkymKfmviKV48uPo51ti9kAxssQqTDLu</p>
            {/* <span>
              <CopyTextIcon />
            </span> */}
          </div>
          <p className="italic text-[16px] mt-[10px]">
            “aped my life savings in Walter, this is FA”
          </p>

         
        </div>

      </div>
      <div
            className="h-[1px] w-[90%] mx-auto mt-[20px]"
            style={{
              background: `linear-gradient(to right, ${websiteTheme.bgColor}, ${websiteTheme.textColor}, ${websiteTheme.bgColor})`,
            }}
          />
      <div
        style={{ color: websiteTheme.textColor }}
        className="flex flex-col gap-[10px]"
      >
        <p className="text-center text-[20px] uppercase mt-[100px]">
          highest quality alpha from selected callers
        </p>
        <p className="text-center text-[20px] uppercase">v v soon</p>
      </div>
    </div>
  );
};

export default Alpha;
