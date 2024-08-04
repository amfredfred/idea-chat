import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setTheme } from "../../libs/redux/slices/theme-slice";
import { Link, useNavigate } from "react-router-dom";
import { setChatSettingsOpen, setChatAudio, setWebsiteMotion } from "../../libs/redux/slices/chat-slice";
import synthIcon from "../../assets/synth.svg";
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
import { Box, FormControlLabel, Switch } from "@mui/material";
import { Android12Switch } from "../CustomSwitches";

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

export default function ChatSettings({ handleMusicPlayPause }: { handleMusicPlayPause: () => void }) {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const themes = useAppSelector(state => state.theme.themes)
  const theme = useAppSelector(state => state.theme.current.styles)
  const chatAudio = useAppSelector(state => state.chat.chatAudio)
  const settingsModal = useAppSelector(state => state.chat.settingsModal)
  const isChatSettingsOpen = useAppSelector(state => state.chat.isChatSettingsOpen)
  const isMusicPlaying = useAppSelector(state => state.chat.isMusicPlaying)
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
        }  p-5 rounded-[8px] max-md:gap-2 flex flex-col md:right-[0] md:gap-[1.5rem]  bg-white absolute md:bottom-[0] md:relative max-md:absolute  max-md:bottom-[110%] max-md:w-[361px]

`}  >

      <Box className='grid grid-cols-6 items-center w-full'>
        <div className="col-span-1 max-md:col-span-6">
          <p style={{ color: theme.buttonColor }} className=" text-[12px] lg:text-[16px]">Visual</p>
        </div>
        <div className="grid grid-cols-5  col-span-5  gap-3 max-md:col-span-6 max-md:mt-2">
          {themes.map((iTheme, index) => (
            <div
              key={`theme-${index}`}
              className=" flex flex-col lg:items-center  col-span-1 gap-2"
              onClick={() => dispatch(setTheme(iTheme.name))}   >
              <div className={`
                  ${iTheme.styles.bgColor === theme.bgColor
                  ? " border-[#0000FF]"
                  : " border-black"
                } border lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[8px] cursor-pointer
                  ${iTheme.class} `}>
                <p>dont sin</p>
                <p>dont sin</p>
                <p>dont sin</p>
              </div>
              <p
                style={{ color: iTheme.styles.bgColor === theme.bgColor ? '#0000FF' : 'black' }}
                className="text-[12px]">
                {iTheme.name}
              </p>
            </div>
          ))}
        </div>
      </Box>
      <div className=" w-[100%] h-[1px] bg-gradient-to-r from-[#0000FF] to-transparent lg:hidden " />
      {/* --------------------------------------------- */}
      <Box className='grid grid-cols-6 items-center w-full max-md:mt-2'>
        <div className=" col-span-1 flex flex-col max-md:flex-row max-sm:justify-between  gap-[10px] cursor-pointer  max-md:col-span-6">
          <Box className='flex gap-1 justify-between items-center'>
            <p style={{ color: theme.buttonColor }} className="  text-[12px] lg:text-[16px] max-[max-content]">Audio</p>
            <FormControlLabel
              checked={isMusicPlaying}
              onChange={handleMusicPlayPause}
              control={<Android12Switch defaultChecked />}
              label=''
            />
          </Box>

          <Box className='flex gap-1 justify-between items-center'>
            <p style={{ color: theme.buttonColor }} className="  text-[12px] lg:text-[16px] max-[max-content]">MSG</p>
            <FormControlLabel
              // checked={isMusicPlaying}
              // onChange={}
              control={<Android12Switch defaultChecked />}
              label=''
              style={{ margin: 0 }}
            />
          </Box>
        </div>
        <div className="col-span-5 grid grid-cols-5 gap-3 max-md:col-span-6 max-md:mt-2 items-center">
          {musics.map((music, index) => (
            <div
              key={`music-${index}`}
              className="flex flex-col lg:items-center col-span-1 gap-2"
              onClick={() => dispatch(setChatAudio(music.source))} >
              <div
                className={`  bg-[#ffffff] text-white text-[10px] p-2 border ${chatAudio === music.source
                  ? "border-[#0000FF]"
                  : "border-black"
                  } lg:h-[65px] lg:w-[65px] rounded-[3px] cursor-pointer flex items-center justify-center`} >
                <img src={music.icon} className="  aspect-square" />
              </div>
              <p
                style={{ color: chatAudio === music.source ? '#0000FF' : 'black' }}
                className="text-[12px]">
                {music.name}
              </p>
            </div>
          ))}
        </div>
      </Box>
      <div className=" w-[100%] h-[1px] bg-gradient-to-r from-[#0000FF] to-transparent lg:hidden" />
      {/* ------------------------------- */}
      <Box className='grid grid-cols-6  w-full items-center'>
        <p style={{ color: theme.buttonColor }} className=" w-[18%] text-[12px] lg:text-[16px] col-span-1 max-md:col-span-6">
          Motion
        </p>
        <div className=" grid w-full grid-cols-5 gap-3 col-span-5 max-md:col-span-6 max-md:mt-2">
          {motions.map((motion, index) => (
            <div
              key={`motion-${index}`}
              className="flex flex-col lg:items-center  col-span-1 gap-2"
              onClick={() => dispatch(setWebsiteMotion(motion.motion))}>
              <div
                className={` bg-[#white] ${settingsModal.motion === motion.motion
                  ? "text-[#0000FF] border border-[#0000FF]"
                  : "text-black border border-black"
                  }  lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[8px] cursor-pointer`} >
                <p>dont sin</p>
                <p>dont sin</p>
                <p>dont sin</p>
              </div>
              <p
                style={{ color: settingsModal.motion === motion.motion ? '#0000FF' : 'black' }}
                className="text-[12px]">
                {motion.name}
              </p>
            </div>
          ))}

        </div>
      </Box>

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
    </motion.div>
  )
}
