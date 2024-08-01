import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { IChatStates } from "../../common/types";
import { Box } from "@mui/material";
import { setChatState } from "../../libs/redux/slices/chat-slice";

const Footer = () => {

  const dispacth = useAppDispatch()
  const chatState = useAppSelector(state => state.chat.state)
  const updateChatState = (state: IChatStates) => dispacth(setChatState(state))
  const websiteTheme = useAppSelector(state => state.theme.current.styles);
  const buttons = ['DEN', 'PUMP.RAY', 'ALPHA']

  return (
    <Box className={` max-sm:mx-auto  mr-auto h-11 flex justify-between rounded-md  max-sm:w-[361px] sm:w-[566px] border border-white overflow-hidden`}>  {
      buttons.map(button => {
        return <Box
          style={{
            backgroundColor: chatState !== button ? 'white' : "transparent",
            color: chatState !== button ? "#000000" : websiteTheme.textColor,
            borderRadius: chatState == button ? 5 : 0
          }}
          className=" flex-grow h-full flex place-content-center place-items-center cursor-pointer" onClick={() => updateChatState(button as any)}>
          <small
            className={` uppercase text-[14px] ml-[25px] h-[30px] w-[90px] flex items-center justify-center rounded-[2px]  `}
          >{button}</small>
        </Box>
      })
    }</Box>
  );
};

export default Footer;
