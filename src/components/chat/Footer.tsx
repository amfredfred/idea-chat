import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { IChatStates } from "../../common/types";
import { setChatState } from "../../libs/redux/slices/settings-slice";
import { Box } from "@mui/material";

const Footer = () => {

  const dispacth = useAppDispatch()
  const chatState = useAppSelector(state => state.settings.chat.state)
  const updateChatState = (state: IChatStates) => dispacth(setChatState(state))
  const websiteTheme = useAppSelector(state => state.theme.current.styles);
  const buttons = ['DEN', 'PUMP', 'ALPHA']

  return (
    <Box className={`  h-11 flex justify-between rounded-md  bg-white  ${websiteTheme.bgColor === "#ffffff" && "border border-black"}`}>  {
      buttons.map(button => {
        return <Box className=" flex-grow h-full flex place-content-center place-items-center cursor-pointer" onClick={() => updateChatState(button as any)}>
          <small
            style={{
              backgroundColor:
                chatState === button ? websiteTheme.bgColor : "#ffffff",
              color: chatState === button ? websiteTheme.textColor : "#000000",
            }}
            className={` uppercase text-[14px] ml-[25px] h-[30px] w-[90px] flex items-center justify-center rounded-[2px]  `}
          >{button}</small>
        </Box>
      })
    }</Box>
  );
};

export default Footer;
