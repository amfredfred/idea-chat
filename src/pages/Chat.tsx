import Navbar from "../components/Navbar";
import { AiOutlineSend } from "react-icons/ai";
import SettingsIcon from "../components/SettingsIcon";
import SettingsClosed from "../components/SettingsClosed";
import { motion, AnimatePresence } from "framer-motion";
import messageNotification from "../assets/message_notification.mp3";
import Focused from "../components/message-animations/Focused";
import synthIcon from "../assets/synth.svg";
import audioIcon from "../assets/audio.svg";
import slideIcon from "../assets/slide.svg";
import onIcon from "../assets/on.svg";
import ambientIcon from "../assets/ambient.svg";
import winIcon from "../assets/win.svg";
import winMusic from "../assets/win.mp3";
import onMusic from "../assets/on.mp3";
import slideMusic from "../assets/slide.mp3";
import synthMusic from "../assets/synth.mp3";
import ambientMusic from "../assets/ambient.mp3";
import EquatorTest from "../components/message-animations/EquatorTest";
import { Link, useNavigate } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import Footer from "../components/chat/Footer";
import Chaos from "../components/message-animations/Chaos";
import TokenExplorer from "../components/pumps-and-den/TokenExplorer";
import useChat from "../hooks/useChat";
import { Box, Drawer } from "@mui/material";
import { IChatStates } from "../common/types";
import { useAppDispatch, useAppSelector } from "../libs/redux/hooks";
import { setTheme } from "../libs/redux/slices/theme-slice";
import PumpChannel from "../components/chat/PumpChannel";
// import { walletAddressState } from "../atoms/wallet"
// import { useNavigate } from "react-router-dom" 

const totalWidth = window.innerWidth;
const totalHeight = window.innerHeight;

const musics = [
  {
    source: winMusic,
    name: 'win',
    icon: winIcon
  },
  {
    source: onMusic,
    name: 'on',
    icon: onIcon
  },
  {
    source: slideMusic,
    name: 'slide',
    icon: slideIcon
  },
  {
    source: synthMusic,
    name: 'synth',
    icon: synthIcon
  },
  {
    source: ambientMusic,
    name: 'ambient',
    icon: ambientIcon
  }
];

const motions = [{
  name: 'chaos',
  motion: "chaos"
}, {
  name: 'focused',
  motion: "focused"
}, {
  name: 'equator',
  motion: "equator"
}]

const notificationSounds: { [key in IChatStates]: string } = {
  DEN: messageNotification,
  PUMP: '',
  ALPHA: ''
}

const Chat = () => {
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.current);
  const themes = useAppSelector((state) => state.theme.themes);
  const dispatch = useAppDispatch()
  const chat = useChat()

  const SettingsPartial = <Drawer
    anchor='right'
    open={chat.isSettingsOpen}
    onClose={() => chat.setIsSettingsOpen(false)}
  >
    <div
      className={`${theme.styles.bgColor === "#ffffff"
        ? "border border-black"
        : "border-none"
        }  p-5 rounded-[8px] flex flex-col  lg:gap-[5px] `}  >
      <div className=" flex  rounded-[8px] flex-col ">
        <div className=" w-[15%]  ">
          <p className=" text-[12px] lg:text-[16px]">Visual</p>
        </div>
        <div className=" flex items-center justify-between w-full gap-3">
          <div className="  w-full flex justify-between lg:justify-around">
            {themes.map((theme, index) => (
              <div
                key={`theme-${index}`}
                className=" flex flex-col items-center"
                onClick={() => dispatch(setTheme(theme.name))}   >
                <div className={theme.class}>
                  <p>dont sin</p>
                  <p>dont sin</p>
                  <p>dont sin</p>
                </div>
                <p
                  className={`text-[10px] lg:text-[16px] ${chat.settingsModal.visual === theme.name
                    ? "text-[#0000FF]"
                    : "text-black"
                    }   rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                >
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" w-[100%] h-[1px] bg-gradient-to-r from-[#0000FF] to-transparent lg:hidden " />
      {/* --------------------------------------------- */}
      <div className=" flex  flex-col   rounded-[8px]">
        <div
          className=" flex items-center gap-[10px] cursor-pointer mr-[5px] "
          onClick={chat.handleMusicPlayPause}
        >
          <p className="  text-[12px] lg:text-[16px]">Audio</p>
          <img src={audioIcon} className=" mt-[-3px]" />
        </div>
        <div className=" w-full flex lg:justify-around justify-between gap-3">
          {musics.map((music, index) => (
            <div
              key={`music-${index}`}
              className=" flex flex-col items-center justify-center"
              onClick={() => chat.setWebsiteAudio(music.source)} >
              <div
                className={`  bg-[#ffffff] text-white text-[10px] p-2 border ${chat.websiteAudio === music.source
                  ? "border-[#0000FF]"
                  : "border-black"
                  }  h-[45px] w-[45px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer flex items-center justify-center`}
              >
                <img src={music.icon} className=" w-[100%] h-auto" />
              </div>
              <p
                className={`text-[10px] lg:text-[16px] ${chat.websiteAudio === music.source
                  ? "text-[#0000FF]"
                  : "text-black"
                  } p-[4px] rounded-[2px] lg:border-none`}
              >
                {music.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className=" w-[100%] h-[1px] bg-gradient-to-r from-[#0000FF] to-transparent lg:hidden" />
      {/* ------------------------------- */}
      <div className=" flex flex-col   rounded-[8px]">
        <p className=" w-[18%] text-[12px] lg:text-[16px]">
          Motion
        </p>
        <div className=" flex w-full lg:justify-around  sm:gap-[40px] lg:gap-0 gap-3">

          {motions.map((motion, index) => (
            <div
              key={`motion-${index}`}
              className=" flex flex-col items-center"
              onClick={() =>
                chat.setSettingsModal({
                  ...chat.settingsModal,
                  motion: motion.motion,
                })
              }
            >
              <div
                className={` bg-[#white] ${chat.settingsModal.motion === motion.motion
                  ? "text-[#0000FF] border border-[#0000FF]"
                  : "text-black border border-black"
                  }  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[8px] cursor-pointer`}
              >
                <p>dont sin</p>
                <p>dont sin</p>
                <p>dont sin</p>
              </div>
              <p className=" text-[10px] lg:text-[16px] p-[4px] rounded-[2px] lg:border-none">
                {motion.name}
              </p>
            </div>
          ))}

        </div>
        <div className="lg:hidden flex flex-col gap-[15px] mt-[15px] w-full">
          <button
            onClick={() => navigate("/profile")}
            className=" uppercase font-jbm  p-[5px]   "
            style={{
              background:
                theme.styles.bgColor === "#ffffff"
                  ? "black"
                  : theme.styles.bgColor,
              color:
                theme.styles.bgColor === "#ffffff"
                  ? "white"
                  : theme.styles.textColor,
            }}
          >
            profile
          </button>
          <button
            className={`  uppercase font-jbm  
                     `}
            style={{
              color:
                theme.styles.bgColor === "#ffffff"
                  ? "#000000"
                  : theme.styles.bgColor,
            }}
          >
            <Link to={"/"}>exit</Link>
          </button>
        </div>
      </div>
    </div>
  </Drawer>

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
        {!chat.isSettingsOpen && (
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
            onClick={() => chat.toggleSettings(!chat.isSettingsOpen)}>
            {chat.isSettingsOpen ? <SettingsClosed color={theme.styles.buttonColor} /> : <SettingsIcon color={theme.styles.buttonColor} />}
          </motion.button>
        </Box>


        {SettingsPartial}
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
      <audio src="" ref={chat.audioRef} loop hidden>
        <source src={chat.websiteAudio} type="audio/mpeg" />
        <source src={chat.websiteAudio} type="audio/mp3" />
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
        {chat.chatState == 'PUMP' && <PumpChannel />}
      </Box>

      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' marginTop='auto'>
        <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
          {chat.chatState == 'DEN' ? DEN : null}
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
