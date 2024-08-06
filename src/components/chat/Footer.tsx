import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { IChatStates } from "../../common/types";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { setChatSettingsOpen, setChatState, setTypedMessage } from "../../libs/redux/slices/chat-slice";
import { motion, AnimatePresence } from 'framer-motion'
import { useCallback } from "react";
import { emitChatEvent } from "../../libs/redux/slices/chat-socket-slice";
import { Close, GraphicEq, Send, Settings } from "@mui/icons-material";
import ChatSettings from "./ChatSettings";

const Footer = ({ handleMusicPlayPause }: { handleMusicPlayPause: () => void }) => {

  const dispacth = useAppDispatch()
  const chatState = useAppSelector(state => state.chat.state)
  const updateChatState = (state: IChatStates) => dispacth(setChatState(state))
  const websiteTheme = useAppSelector(state => state.theme.current.styles);
  const buttons = ['DEN', 'PUMP.RAY', 'ALPHA']
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.current.styles)
  const isChatSettingsOpen = useAppSelector(state => state.chat.isChatSettingsOpen)
  const typedMessage = useAppSelector(state => state.chat.typedMessage)
  const isMobile = useMediaQuery("(max-width:768px)")
  const clickAnimation = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  const handleSendMessage = useCallback(() => dispatch(emitChatEvent('sendMessage', typedMessage)), [typedMessage, dispatch])


  return (
    <Box className=' mx-auto p-4  w-max max-w-full max-sm:w-full max-sm:px-0'>
      <Box alignItems='flex-start' className="flex justify-between relative gap-2 lg:gap-4 m-auto  max-sm:w-full" >
        {!(isChatSettingsOpen && !isMobile) && <AnimatePresence>
          <Box className="w-[60%] max-sm:flex-grow  sm:w-[566px] flex-col gap-4" maxWidth='100%' display='flex'>
            {chatState == 'DEN' && <motion.textarea
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              placeholder="type something retarded..."
              value={typedMessage}
              className={`bg-white ${theme.bgColor === "#ffffff"
                ? "border border-black"
                : "border-none"
                } text-[#121212] uppercase p-3 sm:p-5 text-[13px] lg:text-[18px] mx-auto rounded-[4px] lg:rounded-[8px] w-full outline-none resize-none`}
              onChange={({ target: { value } }) => dispatch(setTypedMessage(value))} //chat.setCurrentUserMessage(e.target.value)
              // onKeyDown={chat.handleKeyDown}
              rows={1}
            />}

            <Box className='w-full  flex items-center '>
              <Box
                style={{ borderColor: websiteTheme.textColor }}
                className={` max-sm:mx-auto h-11 mr-auto  flex justify-between rounded-md sm:w-[566px] border overflow-hidden max-sm:w-full`}>  {
                  buttons.map(button => {
                    return <Box
                      style={{
                        backgroundColor: chatState == button ? websiteTheme.textColor : 'transparent',
                        color: chatState == button ? websiteTheme.bgColor : websiteTheme.textColor,
                        borderRadius: chatState == button ? 5 : 0
                      }}
                      className=" flex-grow h-full flex place-content-center place-items-center cursor-pointer" onClick={() => updateChatState(button as any)}>
                      <small
                        className={` uppercase text-[14px] ml-[25px] h-[30px] w-[90px] flex items-center justify-center rounded-[2px]  `}
                      >{button}</small>
                    </Box>
                  })
                }</Box>
            </Box>
          </Box>



          {chatState == 'DEN' &&
            <Box
              className='max-md:hidden'
              marginTop={isChatSettingsOpen ? 'auto' : undefined} >
              <motion.div
                whileTap={clickAnimation}
                style={{ borderColor: websiteTheme.textColor }}
                className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] border `}
                onClick={handleSendMessage}    >
                <IconButton>
                  <Send style={{ color: websiteTheme.textColor }} />
                </IconButton>
              </motion.div>
            </Box>
          }
        </AnimatePresence>}


        {chatState == 'DEN' && <ChatSettings handleMusicPlayPause={handleMusicPlayPause} />}

        {chatState == 'DEN' &&
          <Box
            className='max-md:hidden'
            marginTop={isChatSettingsOpen ? 'auto' : undefined} >
            <motion.div
              whileTap={clickAnimation}
              style={{ borderColor: websiteTheme.textColor }}
              className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] border`}
              onClick={() => dispatch(setChatSettingsOpen(!isChatSettingsOpen))}  >
              <IconButton>
                {isChatSettingsOpen ? <Close style={{ color: websiteTheme.textColor }} /> : <Settings style={{ color: websiteTheme.textColor }} />}
              </IconButton>
            </motion.div>
          </Box>
        }

        {chatState == 'DEN' && !isChatSettingsOpen &&
          <motion.div
            style={{ borderColor: 'transparent' }}
            whileTap={clickAnimation}
            className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] border max-md:hidden`}  >
            <IconButton>
              <GraphicEq style={{ color: websiteTheme.textColor }} />
            </IconButton>
          </motion.div>
        }
      </Box>
    </Box>
  );
};

export default Footer;
