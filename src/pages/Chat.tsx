import messageNotification from "../assets/message_notification.mp3";
import Footer from "../components/chat/Footer";
import { Box } from "@mui/material";
import { IChatStates } from "../common/types";
import { useAppDispatch, useAppSelector } from "../libs/redux/hooks";
import PumpChannel from "../components/chat/PumpDotRay";
import DenChannel from "../components/chat/DenChannel";
import { useEffect, useRef } from "react";
import ContainedLayout from "../layouts/ContainedLayout";
import { setMusicIsPlaying } from "../libs/redux/slices/chat-slice";

const notificationSounds: { [key in IChatStates]: string } = {
  DEN: messageNotification,
  "PUMP.RAY": '',
  ALPHA: ''
}

const Chat = () => {

  const dispatch = useAppDispatch()
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const notificationRef = useRef<HTMLAudioElement | null>(null);
  const chatState = useAppSelector(state => state.chat.state)
  const isMusicPlaying = useAppSelector(state => state.chat.isMusicPlaying)
  const theme = useAppSelector((state) => state.theme.current);
  const chatAudio = useAppSelector(state => state.chat.chatAudio)

  const handlePlay = async () => {
    if (audioRef.current) {
      if (audioRef.current.src !== chatAudio) {
        audioRef.current.src = chatAudio;
      }
      try {
        await audioRef.current.play();
        dispatch(setMusicIsPlaying(true));
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setMusicIsPlaying(false));
    }
  };

  const handleMusicPlayPause = async () => {
    if (isMusicPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  useEffect(() => {
    handlePlay();
  }, [chatAudio, audioRef]);

  return (
    <ContainedLayout>
      <Box
        style={{
          color: theme.styles.text_color,
        }}
        className={`transition-colors duration-1000 flex flex-col relative font-jbm uppercase h-full overflow-hidden`}
      >
        <audio ref={audioRef} loop hidden>
          <source src={chatAudio} type="audio/mpeg" />
          <source src={chatAudio} type="audio/mp3" />
        </audio>

        <Box flexGrow='1' display='flex' width='100%' overflow='hidden'>
          {chatState == 'PUMP.RAY' ? <PumpChannel /> : chatState == 'DEN' ? <DenChannel /> : null}
        </Box>
        <Footer handleMusicPlayPause={handleMusicPlayPause} />
      </Box>
    </ContainedLayout>
  );
};

export default Chat;
