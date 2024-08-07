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
  }, {
    source: slideMusic,
    name: 'slide',
    icon: slideIcon
  },
  {
    source: onMusic,
    name: 'on',
    icon: onIcon
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
      style={{ background: theme.menu_bg, borderColor: theme.active_color }}
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
              <div className={`gap-2 mx-auto justify-center flex flex-col items-center lg:text-[10px] p-[5px] lg:p-2 rounded-[3px] text-[8px] cursor-pointer`} >
                {/* <img src={music.icon} className="  aspect-square" /> */}
                {music.name === 'win' ? (
                  <svg width="58" height="73" viewBox="0 0 58 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.515 69L18.507 60.24H19.539L20.199 66.72C20.215 66.896 20.231 67.08 20.247 67.272C20.263 67.456 20.275 67.632 20.283 67.8C20.299 67.968 20.307 68.108 20.307 68.22C20.323 68.108 20.335 67.968 20.343 67.8C20.359 67.632 20.375 67.456 20.391 67.272C20.415 67.08 20.439 66.896 20.463 66.72L21.279 60.24H22.395L23.139 66.72C23.163 66.896 23.183 67.08 23.199 67.272C23.223 67.456 23.243 67.632 23.259 67.8C23.283 67.968 23.299 68.108 23.307 68.22C23.315 68.108 23.323 67.968 23.331 67.8C23.347 67.632 23.363 67.456 23.379 67.272C23.403 67.08 23.423 66.896 23.439 66.72L24.123 60.24H25.107L24.075 69H22.719L21.975 62.4C21.959 62.216 21.939 62.036 21.915 61.86C21.899 61.684 21.883 61.52 21.867 61.368C21.851 61.216 21.839 61.092 21.831 60.996C21.823 61.092 21.807 61.216 21.783 61.368C21.767 61.52 21.751 61.684 21.735 61.86C21.719 62.036 21.699 62.216 21.675 62.4L20.871 69H19.515ZM26.6623 69V68.016H28.4503V61.224H26.6623V60.24H31.3423V61.224H29.5543V68.016H31.3423V69H26.6623ZM33.6777 69V60.24H35.1177L37.7937 67.74C37.7777 67.54 37.7577 67.296 37.7337 67.008C37.7177 66.712 37.7017 66.404 37.6857 66.084C37.6777 65.756 37.6737 65.448 37.6737 65.16V60.24H38.7177V69H37.2777L34.6137 61.5C34.6297 61.692 34.6457 61.936 34.6617 62.232C34.6777 62.52 34.6897 62.828 34.6977 63.156C34.7137 63.476 34.7217 63.784 34.7217 64.08V69H33.6777Z" fill={theme[music.source === chatAudio ? 'active_color' : 'inactive_color']} />
                    <rect x="1" y="1" width="56" height="48" rx="2" stroke={music.source === chatAudio ? theme['active_color'] : ''} />
                    <path d="M35.4032 29.8296L24.8387 19.2635L29.6633 14.4469L29.6633 14.4469C30.3591 13.7522 31.1647 13.2125 32.0818 12.8271L32.0819 12.8271C32.9966 12.4423 33.9514 12.25 34.9482 12.25L35.4032 29.8296ZM35.4032 29.8296L40.2214 25.0034L40.2216 25.0032C40.9161 24.3087 41.4552 23.5038 41.8394 22.5867L41.8396 22.5863C42.2243 21.673 42.4167 20.7144 42.4167 19.7083C42.4167 17.627 41.6934 15.8698 40.2434 14.4219C38.7933 12.974 37.0333 12.2511 34.9483 12.25L35.4032 29.8296ZM23.2635 20.8387L23.0867 20.6619L18.27 25.4867C17.5522 26.2044 16.9944 27.0367 16.5967 27.9833L23.2635 20.8387ZM23.2635 20.8387L18.4469 25.6633L18.4468 25.6634C17.7522 26.358 17.2125 27.163 16.8271 28.0802L16.8271 28.0804C16.4424 28.9937 16.25 29.9523 16.25 30.9583C16.25 33.0397 16.9732 34.7968 18.4233 36.2448C19.8734 37.6927 21.634 38.4156 23.7201 38.4167C24.7158 38.4166 25.6706 38.2244 26.5865 37.8395L26.5867 37.8394C27.5038 37.4552 28.3087 36.9161 29.0032 36.2216L29.0034 36.2214L33.8296 31.4032L23.2635 20.8387Z" stroke={theme[music.source === chatAudio ? 'active_color' : 'inactive_color']} stroke-width="0.5" />
                    <path d="M35.4033 30.1833L40.3983 25.18C41.1161 24.4622 41.6733 23.63 42.07 22.6833C42.4678 21.7389 42.6667 20.7472 42.6667 19.7083C42.6667 17.5617 41.9178 15.7406 40.42 14.245C38.9222 12.7494 37.0983 12.0011 34.9483 12C33.9183 12 32.9306 12.1989 31.985 12.5967C31.0383 12.9944 30.2056 13.5522 29.4867 14.27L24.485 19.2633L35.4033 30.1833Z" fill={theme.text_color} />
                  </svg>
                ) : music.name === 'slide' ? (
                  <svg width="58" height="73" viewBox="0 0 58 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6597 69.12C14.0837 69.12 13.5877 69.024 13.1717 68.832C12.7637 68.64 12.4477 68.364 12.2237 68.004C11.9997 67.644 11.8837 67.216 11.8757 66.72H12.9557C12.9557 67.16 13.1037 67.508 13.3997 67.764C13.7037 68.02 14.1237 68.148 14.6597 68.148C15.1637 68.148 15.5557 68.024 15.8357 67.776C16.1237 67.528 16.2677 67.184 16.2677 66.744C16.2677 66.392 16.1717 66.084 15.9797 65.82C15.7957 65.556 15.5277 65.372 15.1757 65.268L13.9877 64.896C13.3877 64.712 12.9237 64.404 12.5957 63.972C12.2757 63.54 12.1157 63.032 12.1157 62.448C12.1157 61.976 12.2197 61.568 12.4277 61.224C12.6437 60.872 12.9437 60.6 13.3277 60.408C13.7117 60.208 14.1637 60.108 14.6837 60.108C15.4517 60.108 16.0677 60.324 16.5317 60.756C16.9957 61.18 17.2317 61.748 17.2397 62.46H16.1597C16.1597 62.028 16.0277 61.692 15.7637 61.452C15.5077 61.204 15.1437 61.08 14.6717 61.08C14.2077 61.08 13.8437 61.192 13.5797 61.416C13.3237 61.64 13.1957 61.952 13.1957 62.352C13.1957 62.712 13.2917 63.024 13.4837 63.288C13.6757 63.552 13.9517 63.74 14.3117 63.852L15.5117 64.236C16.0957 64.42 16.5477 64.732 16.8677 65.172C17.1877 65.612 17.3477 66.128 17.3477 66.72C17.3477 67.2 17.2357 67.62 17.0117 67.98C16.7877 68.34 16.4717 68.62 16.0637 68.82C15.6637 69.02 15.1957 69.12 14.6597 69.12ZM19.587 69V60.24H20.667V68.016H24.627V69H19.587ZM26.6623 69V68.016H28.4503V61.224H26.6623V60.24H31.3423V61.224H29.5543V68.016H31.3423V69H26.6623ZM33.7017 69V60.24H35.9697C36.5377 60.24 37.0257 60.348 37.4337 60.564C37.8497 60.78 38.1697 61.084 38.3937 61.476C38.6257 61.868 38.7417 62.332 38.7417 62.868V66.36C38.7417 66.896 38.6257 67.364 38.3937 67.764C38.1697 68.156 37.8497 68.46 37.4337 68.676C37.0257 68.892 36.5377 69 35.9697 69H33.7017ZM34.7817 68.04H35.9697C36.4977 68.04 36.9097 67.892 37.2057 67.596C37.5097 67.3 37.6617 66.888 37.6617 66.36V62.868C37.6617 62.348 37.5097 61.94 37.2057 61.644C36.9097 61.348 36.4977 61.2 35.9697 61.2H34.7817V68.04ZM40.993 69V60.24H46.033V61.224H42.061V63.936H45.613V64.908H42.061V68.016H46.033V69H40.993Z" fill={theme[music.source === chatAudio ? 'active_color' : 'inactive_color']} />
                    <rect x="1" y="1" width="56" height="48" rx="2" stroke={music.source === chatAudio ? theme['active_color'] : ''} />
                    <path d="M25.3101 15.2373L25.7351 13.1048C26.0176 11.7073 26.1851 10.7298 26.9601 10.2748C27.4701 9.97732 28.0476 9.91982 28.6326 10.1098C30.1101 10.5873 30.2376 13.3673 30.3826 17.0748L29.2976 16.2898C29.2226 13.5948 29.1976 11.3973 28.3101 11.1098C28.0076 11.0123 27.7401 11.0373 27.4901 11.1823C26.9876 11.4773 26.9826 12.2323 26.7651 13.3123L26.3401 15.4423L25.3101 15.2373ZM42.2301 37.8823C42.2301 37.8823 42.1476 38.1473 41.7051 38.1473C41.2626 38.1473 41.1801 37.8823 41.1801 37.8823V34.9948L42.2301 35.5173V37.8823ZM29.1851 37.4648C29.1851 37.4648 29.0476 37.7748 28.6601 37.7748C28.2726 37.7748 28.1351 37.4648 28.1351 37.4648V32.5023L29.1851 33.9723V37.4648Z" fill={theme.text_color} />
                    <path d="M35.4599 37.3872L42.4749 35.6297C42.4749 35.6297 42.2799 35.0922 41.9224 34.9922L34.6899 36.8847L35.4599 37.3872Z" fill={theme.text_color} />
                    <path d="M34.8725 39.7355C34.8725 39.7355 34.79 40.0005 34.3475 40.0005C33.905 40.0005 33.8225 39.7355 33.8225 39.7355V36.9805L34.8725 37.503V39.7355Z" fill={theme.text_color} />
                    <path d="M42.8074 35.5373L42.7249 33.4148C42.7249 32.9173 42.4549 32.6648 42.1424 32.4873C41.8299 32.3098 41.1324 32.1373 41.1324 32.1373C39.0449 31.4148 37.9424 30.1798 37.2174 28.0173C36.6649 26.3698 34.5849 20.6498 33.3749 17.6398C32.7874 16.1748 31.7449 15.0923 30.4374 14.5873C29.4374 14.2023 26.8999 13.8198 26.6174 13.7598L25.5874 13.8423L25.1899 15.8373C26.1849 16.0423 28.9549 16.5998 29.5699 16.8373C30.2449 17.0973 30.7999 17.7023 31.1374 18.5373C32.3324 21.5123 34.3874 27.1573 34.9299 28.7823C35.9149 31.7223 37.8699 33.6148 40.7524 34.4098L42.0074 34.8648L42.0274 35.7573L42.8074 35.5373Z" fill={theme.text_color} />
                    <path d="M42.1924 33.6573C42.1803 33.4255 42.0962 33.2032 41.952 33.0213C41.8077 32.8394 41.6104 32.7069 41.3874 32.6423L40.6499 32.3923C38.5624 31.6698 37.4599 30.4473 36.7349 28.2848C36.1824 26.6373 34.1024 20.9173 32.8924 17.9073C32.3049 16.4423 31.2624 15.3598 29.9549 14.8548C28.9549 14.4698 25.8699 13.8998 25.5849 13.8398L25.1299 16.1298C26.1249 16.3348 28.4724 16.8673 29.0874 17.1023C29.7624 17.3623 30.3174 17.9673 30.6549 18.8023C31.8499 21.7773 33.9049 27.4223 34.4474 29.0473C35.4324 31.9873 37.3874 33.8798 40.2699 34.6748L42.2274 34.9923L42.1924 33.6573Z" fill={theme.text_color} />
                    <path d="M28.135 32.502V34.122C28.445 34.6095 28.795 35.0495 29.185 35.447V33.972L28.135 32.502ZM33.8225 36.9795V37.8195L34.8725 38.0845V37.5045L33.8225 36.9795Z" fill={theme.text_color} />
                    <path d="M31.4299 35.3804C31.4849 35.2979 36.9199 33.7879 36.9199 33.7879C37.2424 33.7129 37.5774 33.7554 37.8699 33.9129C38.2849 34.1354 39.1424 34.4229 40.1824 34.7354C40.3549 34.7879 40.3499 35.0329 40.1774 35.0804L34.4974 36.6929L31.4299 35.3804Z" fill="#B9E4EA" />
                    <path d="M23.3076 30.5567C23.3076 30.5567 23.2476 30.8017 22.8276 30.8317C22.3501 30.8667 22.2276 30.6117 22.2651 30.4217L25.1151 15.8867L26.1451 16.0917L23.3076 30.5567Z" fill={theme.text_color} />
                    <path d="M24.74 18.9218L18.075 20.5793L17.9275 21.3243L24.56 19.6743C24.56 19.6743 24.9725 19.6118 25.0225 19.2943C25.065 19.0118 24.89 18.8793 24.74 18.9218ZM24.18 21.9143L17.485 23.5793L17.3375 24.3243L24 22.6668C24 22.6668 24.4125 22.6044 24.4625 22.2869C24.5075 22.0044 24.33 21.8743 24.18 21.9143ZM23.6225 24.9068L16.8975 26.5768L16.75 27.3219L23.4425 25.6568C23.4425 25.6568 23.855 25.5943 23.905 25.2769C23.9475 24.9969 23.7725 24.8668 23.6225 24.9068ZM23.0625 27.8994L16.305 29.5768L16.1575 30.3219L22.8825 28.6519C22.8825 28.6519 23.295 28.5893 23.345 28.2718C23.39 27.9918 23.2125 27.8594 23.0625 27.8994Z" fill={theme.text_color} />
                    <path d="M24.51 18.9806L20.135 20.0831C20.4925 20.1781 20.7925 20.2656 20.9725 20.3356C21.1025 20.3856 21.2325 20.4356 21.3575 20.4856L24.3625 19.7231L23.92 21.9806L22.8975 22.2356C22.975 22.4431 23.055 22.6581 23.1375 22.8831L23.7725 22.7231L23.565 23.7931C23.7875 24.4031 24.02 25.0556 24.255 25.7231L26.1425 16.0956L25.1125 15.8906L24.51 18.9806Z" fill={theme.text_color} />
                    <path d="M34.8749 36.9117C34.8749 36.9117 32.4474 37.0042 30.3049 34.8617C27.8374 32.3942 23.6849 20.3242 22.4574 19.6317C20.5349 18.5467 18.8774 17.4567 18.8774 17.4567L25.0499 15.8867C25.0499 15.8867 27.6624 16.2742 29.1549 16.9042C29.5274 17.0617 30.2474 17.4092 30.8724 19.0142C31.8999 21.6592 33.3799 26.0442 34.6799 29.0542C35.4299 30.7917 36.0499 31.9017 36.6749 32.3842C39.4549 34.5242 42.1899 34.9942 42.1899 34.9942L34.8749 36.9117Z" fill={theme.text_color} />
                    <path d="M37.2826 32.8333C37.1951 32.7683 36.8001 32.4558 36.7126 32.3883C36.0876 31.9083 35.4701 30.7958 34.7176 29.0583C33.4176 26.0508 31.9376 21.6633 30.9101 19.0183C30.7301 18.5533 30.5076 18.2058 30.3201 17.9258L24.0601 19.5108L29.6751 34.0308C29.8501 34.2858 30.0176 34.5058 30.1826 34.6908L37.2826 32.8333Z" fill="white" />
                    <path d="M35.5351 37.3595L35.4551 35.237C35.4473 35.0287 35.3706 34.8289 35.2372 34.6687C35.1038 34.5086 34.9211 34.3972 34.7176 34.352L34.1476 34.2245C32.0701 33.652 30.7076 32.5645 29.9826 30.402C29.4301 28.752 27.3501 23.032 26.1401 20.0245C25.5526 18.5595 24.5101 17.477 23.2026 16.972C22.2026 16.587 19.7026 16.067 19.3901 16.002L18.5476 16.132L18.6301 18.3045C19.7376 18.5345 21.7226 18.9845 22.3351 19.222C23.0101 19.482 23.5651 20.087 23.9026 20.922C25.0976 23.8945 27.1526 29.5395 27.6951 31.167C28.6801 34.107 30.6351 35.9995 33.5176 36.792L34.8651 37.007L34.8851 37.5495L35.5351 37.3595Z" fill="#B0F2F7" />
                    <path d="M34.8124 35.8184C34.8027 35.5793 34.7166 35.3495 34.5668 35.1628C34.417 34.9761 34.2113 34.8423 33.9799 34.7809L33.5749 34.6734C31.4974 34.1009 30.1349 32.7709 29.4099 30.6084C28.8574 28.9584 26.7774 23.2384 25.5674 20.2309C24.9799 18.7659 23.9374 17.6834 22.6299 17.1784C21.6299 16.7934 18.8599 16.2134 18.5449 16.1484L18.0549 18.5084C19.1624 18.7384 21.1474 19.1884 21.7599 19.4259C22.4349 19.6859 23.0799 19.9134 23.2724 20.4034C24.4524 23.3809 26.5749 29.7459 27.1199 31.3709C28.1049 34.3109 30.0599 36.2034 32.9424 36.9959L34.8824 37.5459L34.8124 35.8184Z" fill={theme.text_color} />
                    <path d="M16.245 32.3675C16.245 32.3675 16.175 32.635 15.7125 32.6675C15.575 32.6775 15.4675 32.655 15.3875 32.62C15.2425 32.56 15.17 32.395 15.2 32.2425L18.4925 15.39C18.775 13.9925 18.9425 13.015 19.7175 12.56C20.2275 12.2625 20.805 12.205 21.39 12.395C22.93 12.8925 23.04 16.5275 23.1975 20.4975C23.1975 20.4975 22.82 20.59 22.525 20.44C22.23 20.29 22.2275 19.9675 22.2275 19.9675C22.105 17.0075 22.095 13.7275 21.0675 13.395C20.765 13.2975 20.4975 13.3225 20.2475 13.4675C19.745 13.7625 19.74 14.5175 19.5225 15.5975L16.245 32.3675Z" fill={theme.text_color} />
                    <path d="M41.1975 35.9517V36.4142L42.23 36.1917V35.6992L41.1975 35.9517Z" fill={theme[music.source == chatAudio ? 'active_color' : 'inactive_color']} />
                    <path d="M19.3626 13.6975C19.2426 13.6375 19.2426 13.445 19.3026 13.33C19.5176 12.9225 19.9526 12.66 20.4101 12.615C20.6351 12.5925 20.6726 12.64 20.7026 12.7225C20.7451 12.8425 20.6151 12.9275 20.4901 12.96C20.1226 13.0625 19.8526 13.28 19.7151 13.5475C19.6226 13.73 19.4826 13.7575 19.3626 13.6975Z" fill="#CFD8DC" />
                  </svg>
                ) : music.name == 'on' ? (
                  <svg width="58" height="73" viewBox="0 0 58 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.9047 69.12C25.3767 69.12 24.9207 69.02 24.5367 68.82C24.1607 68.62 23.8687 68.332 23.6607 67.956C23.4607 67.572 23.3607 67.12 23.3607 66.6V62.64C23.3607 62.112 23.4607 61.66 23.6607 61.284C23.8687 60.908 24.1607 60.62 24.5367 60.42C24.9207 60.22 25.3767 60.12 25.9047 60.12C26.4327 60.12 26.8847 60.22 27.2607 60.42C27.6447 60.62 27.9367 60.908 28.1367 61.284C28.3447 61.66 28.4487 62.108 28.4487 62.628V66.6C28.4487 67.12 28.3447 67.572 28.1367 67.956C27.9367 68.332 27.6447 68.62 27.2607 68.82C26.8847 69.02 26.4327 69.12 25.9047 69.12ZM25.9047 68.148C26.3767 68.148 26.7367 68.016 26.9847 67.752C27.2407 67.48 27.3687 67.096 27.3687 66.6V62.64C27.3687 62.144 27.2407 61.764 26.9847 61.5C26.7367 61.228 26.3767 61.092 25.9047 61.092C25.4407 61.092 25.0807 61.228 24.8247 61.5C24.5687 61.764 24.4407 62.144 24.4407 62.64V66.6C24.4407 67.096 24.5687 67.48 24.8247 67.752C25.0807 68.016 25.4407 68.148 25.9047 68.148ZM30.58 69V60.24H32.02L34.696 67.74C34.68 67.54 34.66 67.296 34.636 67.008C34.62 66.712 34.604 66.404 34.588 66.084C34.58 65.756 34.576 65.448 34.576 65.16V60.24H35.62V69H34.18L31.516 61.5C31.532 61.692 31.548 61.936 31.564 62.232C31.58 62.52 31.592 62.828 31.6 63.156C31.616 63.476 31.624 63.784 31.624 64.08V69H30.58Z" fill={theme[music.source === chatAudio ? 'active_color' : 'inactive_color']} />
                    <rect x="1" y="1" width="56" height="48" rx="2" stroke={music.source === chatAudio ? theme['active_color'] : ''} />
                    <path d="M37.3333 16.666H20.6666C18.8256 16.666 17.3333 18.1584 17.3333 19.9993V29.9993C17.3333 31.8403 18.8256 33.3327 20.6666 33.3327H37.3333C39.1742 33.3327 40.6666 31.8403 40.6666 29.9993V19.9993C40.6666 18.1584 39.1742 16.666 37.3333 16.666Z" stroke={theme.text_color} stroke-width="2" />
                    <path d="M35.6667 20H30.6667C29.7462 20 29 20.7462 29 21.6667V28.3333C29 29.2538 29.7462 30 30.6667 30H35.6667C36.5871 30 37.3333 29.2538 37.3333 28.3333V21.6667C37.3333 20.7462 36.5871 20 35.6667 20Z" fill={theme.text_color} />
                  </svg>
                ) : music.name == 'synth' ? (
                  <svg width="58" height="73" viewBox="0 0 58 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6597 69.12C14.0837 69.12 13.5877 69.024 13.1717 68.832C12.7637 68.64 12.4477 68.364 12.2237 68.004C11.9997 67.644 11.8837 67.216 11.8757 66.72H12.9557C12.9557 67.16 13.1037 67.508 13.3997 67.764C13.7037 68.02 14.1237 68.148 14.6597 68.148C15.1637 68.148 15.5557 68.024 15.8357 67.776C16.1237 67.528 16.2677 67.184 16.2677 66.744C16.2677 66.392 16.1717 66.084 15.9797 65.82C15.7957 65.556 15.5277 65.372 15.1757 65.268L13.9877 64.896C13.3877 64.712 12.9237 64.404 12.5957 63.972C12.2757 63.54 12.1157 63.032 12.1157 62.448C12.1157 61.976 12.2197 61.568 12.4277 61.224C12.6437 60.872 12.9437 60.6 13.3277 60.408C13.7117 60.208 14.1637 60.108 14.6837 60.108C15.4517 60.108 16.0677 60.324 16.5317 60.756C16.9957 61.18 17.2317 61.748 17.2397 62.46H16.1597C16.1597 62.028 16.0277 61.692 15.7637 61.452C15.5077 61.204 15.1437 61.08 14.6717 61.08C14.2077 61.08 13.8437 61.192 13.5797 61.416C13.3237 61.64 13.1957 61.952 13.1957 62.352C13.1957 62.712 13.2917 63.024 13.4837 63.288C13.6757 63.552 13.9517 63.74 14.3117 63.852L15.5117 64.236C16.0957 64.42 16.5477 64.732 16.8677 65.172C17.1877 65.612 17.3477 66.128 17.3477 66.72C17.3477 67.2 17.2357 67.62 17.0117 67.98C16.7877 68.34 16.4717 68.62 16.0637 68.82C15.6637 69.02 15.1957 69.12 14.6597 69.12ZM21.267 69V65.724L18.627 60.24H19.743L21.483 63.84C21.579 64.04 21.655 64.212 21.711 64.356C21.767 64.492 21.803 64.592 21.819 64.656C21.835 64.592 21.871 64.492 21.927 64.356C21.991 64.212 22.071 64.04 22.167 63.84L23.871 60.24H24.987L22.347 65.724V69H21.267ZM26.4823 69V60.24H27.9223L30.5983 67.74C30.5823 67.54 30.5623 67.296 30.5383 67.008C30.5223 66.712 30.5063 66.404 30.4903 66.084C30.4823 65.756 30.4783 65.448 30.4783 65.16V60.24H31.5223V69H30.0823L27.4183 61.5C27.4343 61.692 27.4503 61.936 27.4663 62.232C27.4823 62.52 27.4943 62.828 27.5023 63.156C27.5183 63.476 27.5263 63.784 27.5263 64.08V69H26.4823ZM35.6577 69V61.212H33.2577V60.228H39.1377V61.212H36.7377V69H35.6577ZM40.909 69V60.24H41.989V63.984H44.797V60.24H45.877V69H44.797V64.968H41.989V69H40.909Z" fill={theme[music.source === chatAudio ? 'active_color' : 'inactive_color']} />
                    <rect x="1" y="1" width="56" height="48" rx="2" stroke={music.source === chatAudio ? theme['active_color'] : ''} />
                    <path d="M34.7351 33.7099C35.7126 33.7099 36.5051 32.9175 36.5051 31.9399C36.5051 30.9624 35.7126 30.1699 34.7351 30.1699C33.7575 30.1699 32.9651 30.9624 32.9651 31.9399C32.9651 32.9175 33.7575 33.7099 34.7351 33.7099Z" stroke={theme.text_color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M36.5049 31.9406V24.0723C39.0165 24.0723 40.2499 25.3406 40.2499 28.0064" stroke={theme.text_color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16.9166 13.7507V12.084M19.3333 13.7507V12.084M21.7499 13.7507V12.084M24.1666 13.7507V12.084M26.5833 13.7507V12.084M28.9999 13.7507V12.084M31.4166 13.7507V12.084M33.8333 13.7507V12.084M36.2499 13.7507V12.084M38.6666 13.7507V12.084M41.0833 13.7507V12.084M16.9166 37.9173V36.2507M19.3333 37.9173V36.2507M21.7499 37.9173V36.2507M24.1666 37.9173V36.2507M26.5833 37.9173V36.2507M28.9999 37.9173V36.2507M31.4166 37.9173V36.2507M33.8333 37.9173V36.2507M36.2499 37.9173V36.2507M38.6666 37.9173V36.2507M41.0833 37.9173V36.2507M13.5833 15.4173H15.2499M13.5833 17.8132H15.2499M13.5833 20.209H15.2499M13.5833 22.6048H15.2499M13.5833 25.0007H15.2499M13.5833 27.3965H15.2499M13.5833 29.7923H15.2499M13.5833 32.1882H15.2499M13.5833 34.584H15.2499M42.7499 15.4173H44.4166M42.7499 17.8132H44.4166M42.7499 20.209H44.4166M42.7499 22.6048H44.4166M42.7499 25.0007H44.4166M42.7499 27.3965H44.4166M42.7499 29.7923H44.4166M42.7499 32.1882H44.4166M42.7499 34.584H44.4166M15.2499 13.7507H42.7499V36.2507H15.2499V13.7507Z" stroke={theme.text_color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                ) : music.name == 'ambient' ? (
                  <svg width="58" height="73" viewBox="0 0 58 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.91641 69L7.19641 60.24H8.64841L10.9164 69H9.82441L9.24841 66.672H6.59641L6.02041 69H4.91641ZM6.81241 65.76H9.02041L8.34841 63.06C8.22041 62.548 8.12041 62.12 8.04841 61.776C7.97641 61.432 7.93241 61.208 7.91641 61.104C7.90041 61.208 7.85641 61.432 7.78441 61.776C7.71241 62.12 7.61241 62.544 7.48441 63.048L6.81241 65.76ZM12.4237 69V60.24H13.8397L14.7517 63.072C14.8397 63.328 14.9197 63.584 14.9917 63.84C15.0637 64.088 15.1157 64.28 15.1477 64.416C15.1877 64.28 15.2397 64.088 15.3037 63.84C15.3677 63.584 15.4397 63.324 15.5197 63.06L16.3837 60.24H17.7997V69H16.7437V65.82C16.7437 65.468 16.7557 65.068 16.7797 64.62C16.8037 64.172 16.8357 63.716 16.8757 63.252C16.9157 62.78 16.9557 62.332 16.9957 61.908C17.0437 61.476 17.0837 61.1 17.1157 60.78L15.6997 65.16H14.5597L13.1317 60.78C13.1717 61.092 13.2117 61.456 13.2517 61.872C13.2917 62.28 13.3277 62.716 13.3597 63.18C13.3917 63.636 13.4197 64.092 13.4437 64.548C13.4677 65.004 13.4797 65.428 13.4797 65.82V69H12.4237ZM19.823 69V60.24H22.307C23.107 60.24 23.731 60.44 24.179 60.84C24.635 61.24 24.863 61.796 24.863 62.508C24.863 62.908 24.779 63.256 24.611 63.552C24.443 63.848 24.203 64.076 23.891 64.236C23.587 64.396 23.219 64.472 22.787 64.464V64.284C23.251 64.276 23.651 64.364 23.987 64.548C24.331 64.732 24.595 64.996 24.779 65.34C24.971 65.684 25.067 66.092 25.067 66.564C25.067 67.06 24.963 67.492 24.755 67.86C24.547 68.228 24.251 68.512 23.867 68.712C23.483 68.904 23.023 69 22.487 69H19.823ZM20.879 68.028H22.367C22.871 68.028 23.267 67.896 23.555 67.632C23.851 67.36 23.999 66.992 23.999 66.528C23.999 66.048 23.851 65.66 23.555 65.364C23.267 65.06 22.871 64.908 22.367 64.908H20.879V68.028ZM20.879 63.972H22.295C22.759 63.972 23.123 63.848 23.387 63.6C23.659 63.352 23.795 63.016 23.795 62.592C23.795 62.168 23.663 61.832 23.399 61.584C23.135 61.336 22.771 61.212 22.307 61.212H20.879V63.972ZM27.1623 69V68.016H28.9503V61.224H27.1623V60.24H31.8423V61.224H30.0543V68.016H31.8423V69H27.1623ZM34.2977 69V60.24H39.3377V61.224H35.3657V63.936H38.9177V64.908H35.3657V68.016H39.3377V69H34.2977ZM41.373 69V60.24H42.813L45.489 67.74C45.473 67.54 45.453 67.296 45.429 67.008C45.413 66.712 45.397 66.404 45.381 66.084C45.373 65.756 45.369 65.448 45.369 65.16V60.24H46.413V69H44.973L42.309 61.5C42.325 61.692 42.341 61.936 42.357 62.232C42.373 62.52 42.385 62.828 42.393 63.156C42.409 63.476 42.417 63.784 42.417 64.08V69H41.373ZM50.5483 69V61.212H48.1483V60.228H54.0283V61.212H51.6283V69H50.5483Z" fill={theme[music.source === chatAudio ? 'active_color' : 'inactive_color']} />
                    <rect x="1" y="1" width="56" height="48" rx="2" fill="transparent" stroke={music.source === chatAudio ? theme['active_color'] : ''} />
                    <path d="M23.5955 29.8319C19.1967 27.5159 18.2832 21.8909 22.373 18.7282C26.1252 15.8264 36.7175 15.1267 39.2743 20.0527C41.2078 23.7779 36.5292 24.6832 32.969 25.4572C31.6812 25.7369 30.5405 26.0002 29.9112 26.3722C28.019 27.4957 27.4107 29.6459 27.263 31.0544M28.3835 12.4589C32.192 12.0517 36.692 12.8384 39.8952 14.9647C44.2137 17.8319 44.9502 23.5132 41.2182 27.1784C38.6345 29.7157 35.0997 30.9322 31.5417 31.3132C30.6965 31.4032 27.4017 31.1482 27.1197 31.3132C25.0535 32.5289 26.5302 37.2997 22.8822 37.6327C20.8947 37.8134 19.0077 35.7997 17.8962 34.4167C15.3792 31.2854 14.0195 27.4529 14.4552 23.4142C15.2 16.5194 22.2672 13.1129 28.3835 12.4589Z" stroke={theme.text_color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                ) : null
                }
              </div>
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
            background: theme.text_color, color: theme.inactive_color
          }}
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
