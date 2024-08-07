import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SettingsClosed from "./SettingsClosed";
import SettingsIcon from "./SettingsIcon";
import bottleIcon from "../assets/bottle.png";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../libs/redux/hooks";
import { setChatSettingsOpen } from "../libs/redux/slices/chat-slice";
import { GraphicEq } from "@mui/icons-material";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const websiteTheme = useAppSelector((state) => state.theme.current.styles);
  const clickAnimation = {
    scale: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };
  const [liveUsersCount, setLiveUsersCount] = useState<number>(0);
  const dispatch = useAppDispatch();
  const isChatSettingsOpen = useAppSelector((state) => state.chat.isChatSettingsOpen);

  useEffect(() => {
    // Simulate user count updates
    const interval = setInterval(() => {
      setLiveUsersCount(Math.floor(Math.random() * 100) + 1);
    }, 1000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const MobileNav = () => {
    return (
      <div className=" mx-auto flex justify-between items-center sticky w-full">
        <div>
          <img src={bottleIcon} className="h-[32px] w-auto" />
        </div>
        <div className="flex items-center gap-[10px]">
          <div className="h-[10px] w-[10px] bg-[#00FF00] rounded-full"></div>
          <p style={{ color: websiteTheme.text_color }}>{liveUsersCount} Online</p>
        </div>
        <div className=" grid grid-cols-4 opacity-80 gap-2">
          <motion.div
            whileTap={clickAnimation}
            className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] `}  >
            <IconButton>
              <GraphicEq style={{ color: websiteTheme.text_color }} />
            </IconButton>
          </motion.div>
          <motion.button
            whileTap={clickAnimation}
            className={`p-[5px] col-span-2 rounded-[4px] lg:rounded-[8px] `}
          >
            <IconButton onClick={() => dispatch(setChatSettingsOpen(!isChatSettingsOpen))}>
              {isChatSettingsOpen ? (
                <SettingsClosed color={websiteTheme.text_color} />
              ) : (
                <SettingsIcon color={websiteTheme.text_color} />
              )}
            </IconButton>
          </motion.button>
        </div>
      </div>
    );
  };

  return isMobile ? (
    <MobileNav />
  ) : (
    <Box
      style={{
        color: websiteTheme.text_color,
      }}
      className="uppercase flex  text-[14px] sm:text-[16px] gap-4 lg:gap-6 xl:gap-8 lg:text-[18px] xl:text-[20px] w-full"
    >
      <Box className="flex justify-between gap-4 overflow-hidden w-full">
        <div>
          <img src={bottleIcon} className="h-[32px] w-auto" />
        </div>
        <Box className="flex justify-between gap-4 overflow-hidden">
          <Link to={"/profile"}>
            <p>profile</p>
          </Link>
          <Link to={"/"}>
            <p>exit</p>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;