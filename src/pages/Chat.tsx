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
import Footer from "../components/Footer";
import Chaos from "../components/message-animations/Chaos";
import TokenExplorer from "../components/pumps-and-den/TokenExplorer";
import useChat from "../hooks/useChat";
import { Box } from "@mui/material";
import { IChatStates } from "../common/types";
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

const virtuals = [
  {
    name: 'rem',
    styles: {
      bgColor: "#0000FF",
      textColor: "#ffffff",
      buttonColor: "#0000FF",
    },
    class: 'bg-[#0000FF] text-white p-[5px] lg:p-2 rounded-[3px] text-[8px] lg:text-[10px] cursor-pointer'
  },
  {
    name: 'neo',
    styles: {
      bgColor: "#000000",
      textColor: "#00FF00",
      buttonColor: "#000000",
    },
    class: 'bg-[#000000] text-[#00FF00] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer'
  },
  {
    name: 'oen',
    styles: {
      bgColor: "#00FF00",
      textColor: "#000000",
      buttonColor: "#00FF00",
    },
    class: 'bg-[#00FF00] text-[#000000] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer'
  },
  {
    name: 'hmmm',
    styles: {
      bgColor: "#FF5959",
      textColor: "#ffffff",
      buttonColor: "#000000",
    },
    class: 'bg-[#FF5959] text-[#3D3D3D] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] cursor-pointer'
  },
  {
    name: 'B/W',
    styles: {
      bgColor: "#ffffff",
      textColor: "#000000",
      buttonColor: "#000000",
    },
    class: 'bg-[#ffffff] text-[#000000] text-[8px] lg:text-[10px]  p-[5px] lg:p-2 rounded-[3px] border border-black cursor-pointer'
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

  const chat = useChat()

  const SettingsPartial = <motion.div
    initial={{ y: 100 }}
    animate={{ y: 0 }}
    exit={{ y: 100 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="min-w-max absolute  right-[80%] lg:bottom-[90%] text-black z-50 flex flex-col gap-[10px] shadow rounded"
  >
    <div
      className={`${chat.websiteTheme.bgColor === "#ffffff"
        ? "border border-black"
        : "border-none"
        } bg-white  p-5 rounded-[8px] flex flex-col gap-[20px] lg:gap-[5px] `}  >
      <div className=" flex lg:items-center rounded-[8px] flex-col lg:flex-row ">
        <div className=" w-[15%]  ">
          <p className=" text-[12px] lg:text-[16px]">visual</p>
        </div>
        <div className=" flex items-center justify-between w-full mt-[10px] lg:mt-[0px]">
          <div className="  w-full flex justify-between lg:justify-around">

            {virtuals.map((virtual, index) => (
              <div
                key={`virtual-${index}`}
                className=" flex flex-col items-center"
                onClick={() => {
                  chat.setWebsiteTheme({
                    ...chat.websiteTheme,
                    ...virtual.styles
                  });
                }}
              >
                <div className={virtual.class}>
                  <p>dont sin</p>
                  <p>dont sin</p>
                  <p>dont sin</p>
                </div>
                <p
                  className={`text-[10px] lg:text-[16px] ${chat.settingsModal.visual === "oen"
                    ? "text-[#0000FF]"
                    : "text-black"
                    }   rounded-[2px] p-[4px] lg:border-none lg:p-0`}
                >
                  oen
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" w-[100%] h-[1px] bg-gradient-to-r from-[#0000FF] to-transparent lg:hidden " />
      {/* --------------------------------------------- */}
      <div className=" flex lg:items-center flex-col lg:flex-row   rounded-[8px]">
        <div
          className=" flex items-center gap-[10px] cursor-pointer mr-[5px] "
          onClick={chat.handleMusicPlayPause}
        >
          <p className="  text-[12px] lg:text-[16px]">audio</p>
          <img src={audioIcon} className=" mt-[-3px]" />
        </div>
        <div className=" w-full flex lg:justify-around justify-between mt-[10px] lg:mt-[0px]">

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
      <div className=" flex flex-col lg:flex-row lg:items-center  rounded-[8px]">
        <p className=" w-[18%] text-[12px] lg:text-[16px]">
          motion
        </p>
        <div className=" flex w-full lg:justify-around gap-[20px] sm:gap-[40px] lg:gap-0 mt-[10px] lg:mt-[0px]">

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
                chat.websiteTheme.bgColor === "#ffffff"
                  ? "black"
                  : chat.websiteTheme.bgColor,
              color:
                chat.websiteTheme.bgColor === "#ffffff"
                  ? "white"
                  : chat.websiteTheme.textColor,
            }}
          >
            profile
          </button>
          <button
            className={`  uppercase font-jbm  
                     `}
            style={{
              color:
                chat.websiteTheme.bgColor === "#ffffff"
                  ? "#000000"
                  : chat.websiteTheme.bgColor,
            }}
          >
            <Link to={"/"}>exit</Link>
          </button>
        </div>
      </div>
    </div>
  </motion.div>

  const DEN = (
    <Box width='100%'>
      <div className="relative  lg:h-[75%] overflow-y-auto mb-[10px]  w-full">
        {chat.settingsModal.motion === "focused" ? (
          chat.initialMessages.length > 0 && (
            <Focused
              initialMessages={chat.initialMessages}
              newMessage={chat.newMessage}
            />
          )
        ) : chat.settingsModal.motion === "chaos" ? (
          <Chaos
            newMessage={chat.newMessage}
            width={totalWidth}
            height={totalHeight}
          />
        ) : (
          chat.initialMessages.length > 0 && (
            <EquatorTest
              initialMessages={chat.initialMessages}
              newMessage={chat.newMessage}
            />
          )
        )}
      </div>
      {/* -------------------------------------- */}

      <div className="flex items-start lg:items-center justify-center gap-2 lg:gap-4 h-[7%] w-full ">
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
              value={chat.currentUserMessage}
              className={`bg-white ${chat.websiteTheme.bgColor === "#ffffff"
                ? "border border-black"
                : "border-none"
                } text-[#121212] uppercase p-3 lg:p-5 text-[13px] lg:text-[18px] mx-auto rounded-[4px] lg:rounded-[8px] w-full outline-none resize-none`}
              onChange={(e) => chat.setCurrentUserMessage(e.target.value)}
              onKeyDown={chat.handleKeyDown}
              rows={1}
            />
          </div>
        </AnimatePresence>

        <motion.button
          whileTap={chat.clickAnimation}
          className={`p-[10px] lg:p-[15px] ${chat.websiteTheme.bgColor === "#ffffff"
            ? "border border-black"
            : "border-none"
            } bg-white rounded-[4px] lg:rounded-[8px] hidden lg:block`}
          onClick={chat.handleSendMessage}
        >
          <AiOutlineSend
            className={`w-[22px] lg:w-[35px] h-auto `}
            style={{
              color: chat.websiteTheme.buttonColor,
            }}
          />
        </motion.button>
        {!chat.isSettingsOpen && (
          <motion.button
            whileTap={chat.clickAnimation}
            className={`p-[10px] lg:p-[15px] ${chat.websiteTheme.bgColor === "#ffffff"
              ? "border border-black"
              : "border-none"
              } bg-white rounded-[4px] lg:rounded-[8px] lg:hidden`}
            onClick={chat.handleSendMessage}
          >
            <AiOutlineSend
              className={`w-[22px] lg:w-[35px] h-auto `}
              style={{
                color: chat.websiteTheme.buttonColor,
              }}
            />
          </motion.button>
        )}

        <Box ref={chat.modalRef} className="relative isolate">
          <motion.button
            whileTap={chat.clickAnimation}
            className={`p-[10px] lg:p-[15px] ${chat.websiteTheme.bgColor === "#ffffff"
              ? "border border-black"
              : "border-none"
              } bg-white rounded-[4px] lg:rounded-[8px] hidden lg:block`}
            onClick={() => chat.setIsSettingsOpen(state => !state)}>
            {chat.isSettingsOpen ? <SettingsClosed color={chat.websiteTheme.buttonColor} /> : <SettingsIcon color={chat.websiteTheme.buttonColor} />}
          </motion.button>
          {chat.isSettingsOpen && SettingsPartial}
        </Box>

      </div>
    </Box>
  )

  return (
    <Box
      style={{
        backgroundColor: chat.websiteTheme.bgColor,
        color: chat.websiteTheme.textColor,
      }}
      className={`transition-colors duration-1000 w-full flex flex-col  bg-black relative font-jbm uppercase h-screen lg:h-screen overflow-hidden`}
    >
      <audio src="" ref={chat.audioRef} loop hidden>
        <source src={chat.websiteAudio} type="audio/mpeg" />
        <source src={chat.websiteAudio} type="audio/mp3" />
      </audio>

      <Box className="h-[5%] lg:h-[10%]" sx={{ background: 'red', minHeight: 'max-content', padding: '1rem' }}>
        <Box className="w-[90%] lg:flex justify-end hidden">
          <Navbar {...chat.websiteTheme} />
        </Box>
        <MobileNav
          isSettingsOpen={chat.isSettingsOpen}
          setIsSettingsOpen={chat.setIsSettingsOpen}
          socket={chat.socket}
        />
      </Box>

      <Box flexGrow='1' display='flex' width='100%' overflow='hidden'>
        <TokenExplorer />
      </Box>

      <Box display='flex' alignItems='center' justifyContent='center' width='100%' marginTop='auto'>
        {chat.chatState == 'DEN' ? DEN : null}
        <audio ref={chat.notificationRef} hidden>
          <source src={notificationSounds?.[chat.chatState]} type="audio/mpeg" />
          <source src={notificationSounds?.[chat.chatState]} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </Box>

      <Footer setChatState={chat.setChatState} chatState={chat.chatState} />
    </Box>
  );
};

export default Chat;
