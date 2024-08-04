import messageNotification from "../assets/message_notification.mp3";
import Footer from "../components/chat/Footer";
import useChat from "../hooks/useChat";
import { Box } from "@mui/material";
import { IChatStates } from "../common/types";
import { useAppDispatch, useAppSelector } from "../libs/redux/hooks";
import PumpChannel from "../components/chat/PumpDotRay";
import DenChannel from "../components/chat/DenChannel";
import { useEffect, useRef  } from "react";
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
        console.log('Play', audioRef.current === null);
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

  const chat = useChat()
  return (
    <ContainedLayout>
      <Box
        style={{
          color: theme.styles.textColor,
        }}
        className={`transition-colors duration-1000 flex flex-col relative font-jbm uppercase h-full overflow-hidden`}
      >
        <audio ref={audioRef} loop hidden>
          <source src={chatAudio} type="audio/mpeg" />
          <source src={chatAudio} type="audio/mp3" />
        </audio>

        <Box flexGrow='1' display='flex' width='100%' overflow='hidden'>
          {chatState == 'PUMP.RAY' && <PumpChannel />}
        </Box>

        <Box className='w-full  '>
          <Box alignItems='center' display='flex' margin='auto' flexDirection='column' gap='1rem' width={700} maxWidth={'100vw'} paddingBottom='1rem' >
            <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
              {chatState == 'DEN' ? <DenChannel handleMusicPlayPause={handleMusicPlayPause} /> : null}
              <audio ref={chat.notificationRef} hidden>
                <source src={notificationSounds?.[chatState]} type="audio/mpeg" />
                <source src={notificationSounds?.[chatState]} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    </ContainedLayout>
  );
};

export default Chat;
