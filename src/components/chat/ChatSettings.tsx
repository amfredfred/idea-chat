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
import { Box, Button } from "@mui/material";
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
      style={{ background: theme.menu_bg, borderColor: theme.inactive_color }}
      className={`border  z-10 p-5 max-sm:w-full rounded-[8px] max-md:gap-2 flex flex-col md:right-[0] md:gap-[1.5rem]  bg-white absolute md:bottom-[0] md:relative max-md:absolute  max-md:bottom-[110%] max-md:w-[361px]

`}  >

      <Box className='grid grid-cols-6 items-center w-full'>
        <div className="col-span-1 max-md:col-span-6 lg:mb-6">
          <p style={{ color: theme.inactive_color }} className=" text-[12px] lg:text-[16px]">Visual</p>
        </div>
        <div className="grid grid-cols-5  col-span-5  gap-3 max-md:col-span-6 max-md:mt-2">
          {themes.map((iTheme, index) => (
            <div
              key={`theme-${index}`}
              className=" flex flex-col md:items-center  col-span-1 gap-2"
              onClick={() => dispatch(setTheme(iTheme.name))}   >
              <div className={`mx-auto  justify-center flex flex-col items-center lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[8px] cursor-pointer ${iTheme.class} `}>
                <p>dont sin</p>
                <p>dont sin</p>
                <p>dont sin</p>
              </div>
              <p
                style={{ color: iTheme.styles.bgColor === theme.bgColor ? theme.active_color : theme.inactive_color }}
                className="text-[12px]  text-center">
                {iTheme.name}
              </p>
            </div>
          ))}
        </div>
      </Box>
      <div className=" h-[1px] w-[100%] mx-auto" style={{ background: `linear-gradient(to right,  ${theme.inactive_color}, ${theme.bgColor})`, }} />
      {/* --------------------------------------------- */}
      <Box className='grid grid-cols-6 items-center w-full max-md:mt-2'>
        <div className=" col-span-1 flex flex-col max-md:flex-row max-sm:justify-between cursor-pointer  max-md:col-span-6 lg:mb-6">
          <Box className='flex gap-1 justify-between items-center'>
            <p style={{ color: theme.inactive_color }} className="text-[12px] lg:text-[16px] max-[max-content]">Audio</p>
            <Android12Switch defaultChecked onChange={handleMusicPlayPause} checked={isMusicPlaying} />
          </Box>
          <Box className='flex gap-1 justify-between items-center'>
            <p style={{ color: theme.inactive_color }} className="text-[12px] lg:text-[16px] max-[max-content] mr-5 max-md:mr-0">MSG</p>
            <Android12Switch defaultChecked onChange={undefined} checked={undefined} />
          </Box>
        </div>
        <div className="col-span-5 grid grid-cols-5 gap-3 max-md:col-span-6 max-md:mt-2 items-center">
          {musics.map((music, index) => (
            <div
              key={`music-${index}`}
              className="flex flex-col md:items-center col-span-1"
              onClick={() => dispatch(setChatAudio(music.source))} >
              <div
                style={{ borderColor: music.source === chatAudio ? theme.inactive_color : 'transparent' }}
                className={`gap-2 border mx-auto justify-center flex flex-col items-center lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[8px] cursor-pointer`} >
                <img  src={music.icon} className="  aspect-square" />
              </div>
              <p
                style={{ color: music.source === chatAudio ? theme.active_color : theme.inactive_color }}
                className="text-[12px]  text-center">
                {music.name}
              </p>
            </div>
          ))}
        </div>
      </Box>
      <div className=" h-[1px] w-[100%] mx-auto" style={{ background: `linear-gradient(to right,  ${theme.inactive_color}, ${theme.bgColor})`, }} />
      {/* ------------------------------- */}
      <Box className='grid grid-cols-6  w-full items-center'>
        <p style={{ color: theme.inactive_color }} className=" w-[18%] text-[12px] lg:text-[16px] col-span-1 max-md:col-span-6 lg:mb-6">
          Motion
        </p>
        <div className=" grid w-full grid-cols-5 gap-3 col-span-5 max-md:col-span-6 max-md:mt-2">
          {motions.map((motion, index) => (
            <div
              key={`motion-${index}`}
              className="flex flex-col md:items-centercol-span-1 gap-2 "
              onClick={() => dispatch(setWebsiteMotion(motion.motion))}>
              <div
                style={{ borderColor: theme.inactive_color }}
                className={` border  mx-auto  justify-center flex flex-col items-center lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[8px] cursor-pointer`} >
                <p>dont sin</p>
                <p>dont sin</p>
                <p>dont sin</p>
              </div>
              <p
                style={{ color: settingsModal.motion === motion.motion ? theme.active_color : theme.inactive_color }}
                className="text-[12px]  text-center">
                {motion.name}
              </p>
            </div>
          ))}

        </div>
      </Box>

      <div className="lg:hidden uppercase grid grid-cols-2 gap-[15px] mt-[15px] w-full font-jbm">
        <Button
          onClick={() => navigate("/profile")}
          style={{
            background:theme.inactive_color, color:theme.bgColor}}
        >
          profile
        </Button>
        <Button
          style={{
            color: 'red'
          }}
        >
          <Link to={"/"}>disconnect</Link>
        </Button>
      </div>
    </motion.div>
  )
}
