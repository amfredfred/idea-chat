import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setTheme } from "../../libs/redux/slices/theme-slice";
import { Link, useNavigate } from "react-router-dom";
import { setChatSettingsOpen, setChatAudio, setWebsiteMotion } from "../../libs/redux/slices/chat-slice";
import synthIcon from "../../assets/synth.svg";
import audioIcon from "../../assets/audio.svg";
import slideIcon from "../../assets/slide.svg";
import onIcon from "../../assets/on.svg";
import ambientIcon from "../../assets/ambient.svg";
import winIcon from "../../assets/win.svg";
import winMusic from "../../assets/win.mp3";
import onMusic from "../../assets/on.mp3";
import slideMusic from "../../assets/slide.mp3";
import synthMusic from "../../assets/synth.mp3";
import ambientMusic from "../../assets/ambient.mp3";
import { useCallback, useEffect, useRef } from "react";
import { motion } from 'framer-motion'

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

export default function ChatSettings() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const themes = useAppSelector(state => state.theme.themes)
  const theme = useAppSelector(state => state.theme.current.styles)
  const chatAudio = useAppSelector(state => state.chat.chatAudio)
  const settingsModal = useAppSelector(state => state.chat.settingsModal)
  const isChatSettingsOpen = useAppSelector(state => state.chat.isChatSettingsOpen)
  const closeMenu = useCallback(() => dispatch(setChatSettingsOpen(false)), [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeMenu]);


  if (!isChatSettingsOpen) return null

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      ref={containerRef}
      // style={{ background: theme.bgColor }}
      className={`${theme.bgColor === "#ffffff"
        ? "border border-black"
        : "border-none"
        }  p-5 rounded-[8px] flex flex-col md:right-[0] md:gap-[5px]  bg-white absolute md:bottom-[0] md:relative max-md:absolute  max-md:bottom-[110%] max-md:w-[361px]`}  >
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
                  className={`text-[10px] lg:text-[16px] ${settingsModal.visual === theme.name
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
        // onClick={chat.handleMusicPlayPause}
        >
          <p className="  text-[12px] lg:text-[16px]">Audio</p>
          <img src={audioIcon} className=" mt-[-3px]" />
        </div>
        <div className=" w-full flex lg:justify-around justify-between gap-3">
          {musics.map((music, index) => (
            <div
              key={`music-${index}`}
              className=" flex flex-col items-center justify-center"
              onClick={() => dispatch(setChatAudio(music.source))} >
              <div
                className={`  bg-[#ffffff] text-white text-[10px] p-2 border ${chatAudio === music.source
                  ? "border-[#0000FF]"
                  : "border-black"
                  }  h-[45px] w-[45px] lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer flex items-center justify-center`}
              >
                <img src={music.icon} className=" w-[100%] h-auto" />
              </div>
              <p
                className={`text-[10px] lg:text-[16px] ${chatAudio === music.source
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
              onClick={() => dispatch(setWebsiteMotion(motion.motion))}
            >
              <div
                className={` bg-[#white] ${settingsModal.motion === motion.motion
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
                theme.bgColor === "#ffffff"
                  ? "black"
                  : theme.bgColor,
              color:
                theme.bgColor === "#ffffff"
                  ? "white"
                  : theme.textColor,
            }}
          >
            profile
          </button>
          <button
            className={`  uppercase font-jbm  
                     `}
            style={{
              color:
                theme.bgColor === "#ffffff"
                  ? "#000000"
                  : theme.bgColor,
            }}
          >
            <Link to={"/"}>exit</Link>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
