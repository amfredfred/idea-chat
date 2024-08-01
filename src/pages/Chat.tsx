import Navbar from "../components/Navbar";
import messageNotification from "../assets/message_notification.mp3";
import MobileNav from "../components/MobileNav";
import Footer from "../components/chat/Footer";
import useChat from "../hooks/useChat";
import { Box } from "@mui/material";
import { IChatStates } from "../common/types";
import { useAppDispatch, useAppSelector } from "../libs/redux/hooks";
import PumpChannel from "../components/chat/PumpChannel";
import { setMusicIsPlaying } from "../libs/redux/slices/audio-slice";
import DenChannel from "../components/chat/DenChannel";
import { useCallback, useEffect, useRef } from "react";

const notificationSounds: { [key in IChatStates]: string } = {
  DEN: messageNotification,
  PUMP: '',
  ALPHA: ''
}

const Chat = () => {

  const dispatch = useAppDispatch()
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chatState = useAppSelector(state => state.chat.state)
  const theme = useAppSelector((state) => state.theme.current);
  const chatAudio = useAppSelector(state => state.chat.chatAudio)

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

  return (
    <Box
      style={{
        backgroundColor: theme.styles.bgColor,
        color: theme.styles.textColor,
      }}
      className={`transition-colors duration-1000 w-full flex flex-col  bg-black relative font-jbm uppercase h-screen lg:h-screen overflow-hidden`}
    >
      <audio ref={audioRef} loop hidden>
        <source src={chatAudio} type="audio/mpeg" />
        <source src={chatAudio} type="audio/mp3" />
      </audio>

      <Box className=" flex py-2 px-4   justify-end align-middle" >
        <Navbar {...theme.styles} />
        <MobileNav socket={chat.socket} />
      </Box>

      <Box flexGrow='1' display='flex' width='100%' overflow='hidden'>
        {chatState == 'PUMP' && <PumpChannel />}
      </Box>

      <Box className='flex flex-col justify-center mt-auto p-2' alignItems='center'>
        <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
          {chatState == 'DEN' ? <DenChannel /> : null}
          <audio ref={chat.notificationRef} hidden>
            <source src={notificationSounds?.[chatState]} type="audio/mpeg" />
            <source src={notificationSounds?.[chatState]} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Chat;
