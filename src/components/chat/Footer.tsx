import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { IChatStates } from "../../common/types";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { setChatSettingsOpen, setChatState, setShouldPlayAudio, setTypedMessage } from "../../libs/redux/slices/chat-slice";
import { motion, AnimatePresence } from 'framer-motion'
import { useCallback } from "react";
import { emitChatEvent } from "../../libs/redux/slices/chat-socket-slice";
import { Close, Send, Settings } from "@mui/icons-material";
import ChatSettings from "./ChatSettings";

const Footer = () => {

  const dispacth = useAppDispatch()
  const chatState = useAppSelector(state => state.chat.state)
  const updateChatState = (state: IChatStates) => dispacth(setChatState(state))
  const websiteTheme = useAppSelector(state => state.theme.current.styles);
  const buttons = ['DEN', 'PUMP.RAY', 'ALPHA']
  const dispatch = useAppDispatch()
  const theme = useAppSelector(state => state.theme.current.styles)
  const isChatSettingsOpen = useAppSelector(state => state.chat.isChatSettingsOpen)
  const isMusicPlaying = useAppSelector(state => state.chat.isMusicPlaying)
  const typedMessage = useAppSelector(state => state.chat.typedMessage)
  const isMobile = useMediaQuery("(max-width:768px)")
  const clickAnimation = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };

  const handleSendMessage = useCallback(() => dispatch(emitChatEvent('sendMessage', typedMessage)), [typedMessage, dispatch])
  const handlePlayAudio = useCallback((state: boolean = true) => dispatch(setShouldPlayAudio(state)), [dispatch]);
  const handlePauseAudio = useCallback((state: boolean = false) => dispatch(setShouldPlayAudio(state)), [dispatch]);


  return (
    <Box className=' mx-auto p-4  w-max max-w-full max-sm:w-full max-sm:px-0'>
      <Box alignItems='flex-start' className="flex justify-between relative gap-2 lg:gap-4 m-auto  max-sm:w-full" >
        {!(isChatSettingsOpen && !isMobile) && <AnimatePresence>
          <Box className="w-[60%] max-sm:flex-grow  sm:w-[566px] flex-col gap-4" maxWidth='100%' display='flex'>
            {chatState == 'DEN' && !isChatSettingsOpen && <motion.textarea
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
                style={{ borderColor: websiteTheme.text_color }}
                className={` max-sm:mx-auto h-11 mr-auto  flex justify-between rounded-md sm:w-[566px] border overflow-hidden max-sm:w-full`}>  {
                  buttons.map(button => {
                    return <Box
                      style={{
                        backgroundColor: chatState == button ? websiteTheme.text_color : 'transparent',
                        color: chatState == button ? websiteTheme.bgColor : websiteTheme.text_color,
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
                style={{ borderColor: websiteTheme.text_color }}
                className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] border `}
                onClick={handleSendMessage}    >
                <IconButton>
                  <Send style={{ color: websiteTheme.text_color }} />
                </IconButton>
              </motion.div>
            </Box>
          }
        </AnimatePresence>}


        {chatState == 'DEN' && <ChatSettings />}

        {chatState == 'DEN' &&
          <Box
            className='max-md:hidden'
            marginTop={isChatSettingsOpen ? 'auto' : undefined} >
            <motion.div
              whileTap={clickAnimation}
              style={{ borderColor: websiteTheme.text_color }}
              className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] border`}
              onClick={() => dispatch(setChatSettingsOpen(!isChatSettingsOpen))}  >
              <IconButton>
                {isChatSettingsOpen ? <Close style={{ color: websiteTheme.text_color }} /> : <Settings style={{ color: websiteTheme.text_color }} />}
              </IconButton>
            </motion.div>
          </Box>
        }

        {chatState == 'DEN' && !isChatSettingsOpen &&
          <motion.div
            style={{ borderColor: 'transparent' }}
            whileTap={clickAnimation}
            className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] border max-md:hidden`}  >
            <IconButton onClick={() => isMusicPlaying ? handlePauseAudio() : handlePlayAudio()}>
              {!isMusicPlaying ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_5268_2695)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2856 1.45857C13.2856 1.11757 13.1502 0.790547 12.909 0.549429C12.6679 0.30831 12.3409 0.172852 11.9999 0.172852C11.6589 0.172852 11.3319 0.30831 11.0908 0.549429C10.8496 0.790547 10.7142 1.11757 10.7142 1.45857V22.5426C10.7142 22.8836 10.8496 23.2106 11.0908 23.4517C11.3319 23.6928 11.6589 23.8283 11.9999 23.8283C12.3409 23.8283 12.6679 23.6928 12.909 23.4517C13.1502 23.2106 13.2856 22.8836 13.2856 22.5426V1.45857ZM6.85704 4.22714C7.19803 4.22714 7.52506 4.3626 7.76618 4.60371C8.00729 4.84483 8.14275 5.17186 8.14275 5.51285V18.4866C8.14275 18.8276 8.00729 19.1546 7.76618 19.3957C7.52506 19.6368 7.19803 19.7723 6.85704 19.7723C6.51605 19.7723 6.18902 19.6368 5.9479 19.3957C5.70678 19.1546 5.57132 18.8276 5.57132 18.4866V5.51285C5.57132 5.17186 5.70678 4.84483 5.9479 4.60371C6.18902 4.3626 6.51605 4.22714 6.85704 4.22714ZM1.71418 8.28142C2.05517 8.28142 2.3822 8.41688 2.62332 8.658C2.86444 8.89912 2.9999 9.22614 2.9999 9.56714V14.434C2.9999 14.775 2.86444 15.102 2.62332 15.3431C2.3822 15.5842 2.05517 15.7197 1.71418 15.7197C1.37319 15.7197 1.04616 15.5842 0.805044 15.3431C0.563926 15.102 0.428467 14.775 0.428467 14.434V9.56714C0.428467 9.22614 0.563926 8.89912 0.805044 8.658C1.04616 8.41688 1.37319 8.28142 1.71418 8.28142ZM17.1428 4.22714C17.4837 4.22714 17.8108 4.3626 18.0519 4.60371C18.293 4.84483 18.4285 5.17186 18.4285 5.51285V18.4866C18.4285 18.8276 18.293 19.1546 18.0519 19.3957C17.8108 19.6368 17.4837 19.7723 17.1428 19.7723C16.8018 19.7723 16.4747 19.6368 16.2336 19.3957C15.9925 19.1546 15.857 18.8276 15.857 18.4866V5.51285C15.857 5.17186 15.9925 4.84483 16.2336 4.60371C16.4747 4.3626 16.8018 4.22714 17.1428 4.22714ZM23.5713 9.56714C23.5713 9.22614 23.4359 8.89912 23.1947 8.658C22.9536 8.41688 22.6266 8.28142 22.2856 8.28142C21.9446 8.28142 21.6176 8.41688 21.3765 8.658C21.1354 8.89912 20.9999 9.22614 20.9999 9.56714V14.434C20.9999 14.775 21.1354 15.102 21.3765 15.3431C21.6176 15.5842 21.9446 15.7197 22.2856 15.7197C22.6266 15.7197 22.9536 15.5842 23.1947 15.3431C23.4359 15.102 23.5713 14.775 23.5713 14.434V9.56714Z" fill={websiteTheme.text_color} />
                </g>
                <defs>
                  <clipPath id="clip0_5268_2695">
                    <rect width="24" height="24" fill={websiteTheme.text_color} />
                  </clipPath>
                </defs>
              </svg>) : (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_5268_2281)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8571 1.45954C12.8571 1.11855 12.7217 0.791523 12.4806 0.550405C12.2394 0.309287 11.9124 0.173828 11.5714 0.173828C11.2304 0.173828 10.9034 0.309287 10.6623 0.550405C10.4212 0.791523 10.2857 1.11855 10.2857 1.45954V22.5435C10.2857 22.8845 10.4212 23.2116 10.6623 23.4527C10.9034 23.6938 11.2304 23.8293 11.5714 23.8293C11.9124 23.8293 12.2394 23.6938 12.4806 23.4527C12.7217 23.2116 12.8571 22.8845 12.8571 22.5435V1.45954ZM6.42857 4.22811C6.76956 4.22811 7.09659 4.36357 7.33771 4.60469C7.57883 4.84581 7.71429 5.17284 7.71429 5.51383V18.4875C7.71429 18.8285 7.57883 19.1556 7.33771 19.3967C7.09659 19.6378 6.76956 19.7733 6.42857 19.7733C6.08758 19.7733 5.76055 19.6378 5.51943 19.3967C5.27832 19.1556 5.14286 18.8285 5.14286 18.4875V5.51383C5.14286 5.17284 5.27832 4.84581 5.51943 4.60469C5.76055 4.36357 6.08758 4.22811 6.42857 4.22811ZM1.28571 8.2824C1.62671 8.2824 1.95373 8.41786 2.19485 8.65898C2.43597 8.9001 2.57143 9.22712 2.57143 9.56811V14.435C2.57143 14.776 2.43597 15.103 2.19485 15.3441C1.95373 15.5852 1.62671 15.7207 1.28571 15.7207C0.944722 15.7207 0.617695 15.5852 0.376577 15.3441C0.135459 15.103 5.08119e-09 14.776 0 14.435V9.56811C0 9.22712 0.135459 8.9001 0.376577 8.65898C0.617695 8.41786 0.944722 8.2824 1.28571 8.2824ZM16.7143 4.22811C17.0553 4.22811 17.3823 4.36357 17.6234 4.60469C17.8645 4.84581 18 5.17284 18 5.51383V18.4875C18 18.8285 17.8645 19.1556 17.6234 19.3967C17.3823 19.6378 17.0553 19.7733 16.7143 19.7733C16.3733 19.7733 16.0463 19.6378 15.8051 19.3967C15.564 19.1556 15.4286 18.8285 15.4286 18.4875V5.51383C15.4286 5.17284 15.564 4.84581 15.8051 4.60469C16.0463 4.36357 16.3733 4.22811 16.7143 4.22811ZM23.1429 9.56811C23.1429 9.22712 23.0074 8.9001 22.7663 8.65898C22.5252 8.41786 22.1981 8.2824 21.8571 8.2824C21.5162 8.2824 21.1891 8.41786 20.948 8.65898C20.7069 8.9001 20.5714 9.22712 20.5714 9.56811V14.435C20.5714 14.776 20.7069 15.103 20.948 15.3441C21.1891 15.5852 21.5162 15.7207 21.8571 15.7207C22.1981 15.7207 22.5252 15.5852 22.7663 15.3441C23.0074 15.103 23.1429 14.776 23.1429 14.435V9.56811Z" fill={websiteTheme.text_color} />
                  <rect x="2" y="3.91797" width="4" height="24" rx="2" transform="rotate(-41.7095 2 3.91797)" fill={websiteTheme.text_color} />
                </g>
                <defs>
                  <clipPath id="clip0_5268_2281">
                    <rect width="24" height="24" fill={websiteTheme.text_color} />
                  </clipPath>
                </defs>
              </svg>)}
            </IconButton>
          </motion.div>
        }
      </Box>
    </Box>
  );
};

export default Footer;
