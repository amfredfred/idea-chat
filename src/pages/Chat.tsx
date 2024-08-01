import Navbar from "../components/Navbar";
import { AiOutlineSend } from "react-icons/ai";
import SettingsIcon from "../components/SettingsIcon";
import SettingsClosed from "../components/SettingsClosed";
import { motion, AnimatePresence } from "framer-motion";
import messageNotification from "../assets/message_notification.mp3";
import Focused from "../components/message-animations/Focused";
import EquatorTest from "../components/message-animations/EquatorTest";
import MobileNav from "../components/MobileNav";
import Footer from "../components/chat/Footer";
import Chaos from "../components/message-animations/Chaos";
import useChat from "../hooks/useChat";
import { Box, Button } from "@mui/material";
import { IChatStates } from "../common/types";
import { useAppDispatch, useAppSelector } from "../libs/redux/hooks";
import PumpChannel from "../components/chat/PumpChannel";
import ChatSettings from "../components/chat/ChatSettings";
import { setChatSettingsOpen } from "../libs/redux/slices/chat-slice";
import { useCallback, useEffect, useRef } from "react";
import { setMusicIsPlaying } from "../libs/redux/slices/audio-slice";
// import { walletAddressState } from "../atoms/wallet"
// import { useNavigate } from "react-router-dom" 

const totalWidth = window.innerWidth;
const totalHeight = window.innerHeight;
const notificationSounds: { [key in IChatStates]: string } = {
  DEN: messageNotification,
  PUMP: '',
  ALPHA: ''
}

const Chat = () => {

  const theme = useAppSelector((state) => state.theme.current);
  const chatState = useAppSelector(state => state.chat.state)
  const chatAudio = useAppSelector(state => state.chat.chatAudio)
  const isChatSettingsOpen = useAppSelector(state => state.chat.isChatSettingsOpen);
  const dispatch = useAppDispatch()
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleMusicPlayPause = useCallback(async () => {
    if (audioRef.current) { 
      if (audioRef.current.src != chatAudio) {
        audioRef.current.src = chatAudio
      }
      if (audioRef.current.paused) {
        await audioRef.current.play();
        dispatch(setMusicIsPlaying(true));
      } else {
        audioRef.current.pause();
        dispatch(setMusicIsPlaying(false));
      }
    }
  }, [chatAudio, dispatch, audioRef]);

  useEffect(() => {
    handleMusicPlayPause()
  }, [handleMusicPlayPause]);

  const chat = useChat()

  const DEN = (
    <Box width='100%'>
      <div className="relative  lg:h-[75%] overflow-y-auto mb-[10px]  w-full">
        {chat.settingsModal.motion === "focused" ? (
          chat.initialMessages.length > 0 && (
            <Focused />
          )
        ) : chat.settingsModal.motion === "chaos" ? (
          <Chaos
            newMessage={chat.currentUserMessage}
            width={totalWidth}
            height={totalHeight}
          />
        ) : (
          chat.initialMessages.length > 0 && (
            <EquatorTest
              initialMessages={chat.initialMessages}
              newMessage={chat.currentUserMessage}
            />
          )
        )}
      </div>
      {/* -------------------------------------- */}

      <div className="flex items-start  justify-center gap-2 lg:gap-4 h-[7%] w-full ">
        <AnimatePresence>
          <div className="w-[60%] lg:w-[40%] xl:w-[35%]   ">
            <motion.textarea
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              placeholder="type something retarded..."
              value={''}
              className={`bg-white ${theme.styles.bgColor === "#ffffff"
                ? "border border-black"
                : "border-none"
                } text-[#121212] uppercase p-3 lg:p-5 text-[13px] lg:text-[18px] mx-auto rounded-[4px] lg:rounded-[8px] w-full outline-none resize-none`}
              // onChange={() => null} //chat.setCurrentUserMessage(e.target.value)
              onKeyDown={chat.handleKeyDown}
              rows={1}
            />
          </div>
        </AnimatePresence>

        <motion.button
          whileTap={chat.clickAnimation}
          className={`p-[10px] lg:p-[15px] ${theme.styles.bgColor === "#ffffff"
            ? "border border-black"
            : "border-none"
            } bg-white rounded-[4px] lg:rounded-[8px] hidden lg:block`}
          onClick={chat.handleSendMessage}
        >
          <AiOutlineSend
            className={`w-[22px] lg:w-[35px] h-auto `}
            style={{
              color: theme.styles.buttonColor,
            }}
          />
        </motion.button>
        {!isChatSettingsOpen && (
          <motion.button
            whileTap={chat.clickAnimation}
            className={`p-[10px] lg:p-[15px] ${theme.styles.bgColor === "#ffffff"
              ? "border border-black"
              : "border-none"
              } bg-white rounded-[4px] lg:rounded-[8px] lg:hidden`}
            onClick={chat.handleSendMessage}
          >
            <AiOutlineSend
              className={`w-[22px] lg:w-[35px] h-auto `}
              style={{
                color: theme.styles.buttonColor,
              }}
            />
          </motion.button>
        )}

        <Box ref={chat.modalRef} className="relative isolate">
          <motion.button
            whileTap={chat.clickAnimation}
            className={`p-[10px] lg:p-[15px] ${theme.styles.bgColor === "#ffffff"
              ? "border border-black"
              : "border-none"
              } bg-white rounded-[4px] lg:rounded-[8px] hidden lg:block`}
            onClick={() => dispatch(setChatSettingsOpen(!isChatSettingsOpen))}>
            {isChatSettingsOpen ? <SettingsClosed color={theme.styles.buttonColor} /> : <SettingsIcon color={theme.styles.buttonColor} />}
          </motion.button>sd
        </Box>

        <ChatSettings />
      </div>
    </Box>
  )

  return (
    <Box
      style={{
        backgroundColor: theme.styles.bgColor,
        color: theme.styles.textColor,
      }}
      className={`transition-colors duration-1000 w-full flex flex-col  bg-black relative font-jbm uppercase h-screen lg:h-screen overflow-hidden`}
    >

      <Button onClick={handleMusicPlayPause}>
        handleMusicPlayPause
      </Button>
      <audio ref={audioRef} loop hidden>
        <source src={chatAudio} type="audio/mpeg" />
        <source src={chatAudio} type="audio/mp3" />
      </audio>

      <Box className=" flex py-2 px-4   justify-end align-middle" >
        <Navbar {...theme.styles} />
        <MobileNav
          isSettingsOpen={chat.isSettingsOpen}
          setIsSettingsOpen={chat.setIsSettingsOpen}
          socket={chat.socket}
        />
      </Box>

      <Box flexGrow='1' display='flex' width='100%' overflow='hidden'>
        {chatState == 'PUMP' && <PumpChannel />}
      </Box>

      <Box className='flex flex-col justify-center mt-auto p-2' alignItems='center'>
        <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
          {chatState == 'DEN' ? DEN : null}
          <audio ref={chat.notificationRef} hidden>
            <source src={notificationSounds?.[chat.chatState]} type="audio/mpeg" />
            <source src={notificationSounds?.[chat.chatState]} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Chat;
