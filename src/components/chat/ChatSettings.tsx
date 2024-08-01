import { Drawer } from "@mui/material";
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
  const themes = useAppSelector(state => state.theme.themes)
  const theme = useAppSelector(state => state.theme.current)
  const { isChatSettingsOpen, settingsModal, chatAudio } = useAppSelector(state => state.chat)

  // const handleMusicPlayPause = useCallback(async () => {
  //   if (audioRef.current) {
  //     if (audioRef.current.paused) {
  //       await audioRef.current.play();
  //       dispatch(setMusicIsPlaying(true));
  //     } else {
  //       audioRef.current.pause();
  //       dispatch(setMusicIsPlaying(false));
  //     }
  //   }
  // }, [dispatch]);

  return (
    <Drawer
      anchor='right'
      open={isChatSettingsOpen}
      onClose={() => dispatch(setChatSettingsOpen(false))}
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
                onClick={() => {
                  dispatch(setChatAudio(music.source))
                  console.log('dispatch(setChatAudio(music.source))', music)
                }} >
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
  )
}
