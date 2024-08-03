import { useCallback, useEffect, useRef, useState } from "react"
import { TransactionsCountErrorIcon } from "../components/Icons"
import { motion } from 'framer-motion'
import { useWallet } from "@solana/wallet-adapter-react"
import { useNavigate } from "react-router-dom"
// import bgVideo from "../assets/bg1.mp4";
import bottle from "../assets/bottle.png";
import winMusic from "../assets/win.mp3";
import { SolanaConnect } from "../components/ConnectButton";
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { VolumeOff, VolumeUp } from "@mui/icons-material"

import bgVideoMobile from '../assets/videos/newBgMobile.mp4'
import bgVideoDesktop from '../assets/videos/newBgMobile.mp4'


const messageAcessDenied = () => {
  return <div className=" text-white text-center mt-[-10px] flex flex-col gap-[10px] ">
    <div className=" flex justify-center">
      <TransactionsCountErrorIcon />
    </div>
    <p>access denied</p>
    <p className=" lg:w-[1000px]">
      wallet must have at least 69 transactions in the past
      to access this universe
    </p>
  </div>
}

const VerifyingMessage = () => {
  return <p>verifying...</p>
}


export default function Landing() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const wallet = useWallet()
  const [showWalletTransactionsError, setShowWalletTransactionsError] = useState(false);
  const [showVerifying, setShowVerifying] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)")
  const [bgSource, setBgSource] = useState(isMobile ? bgVideoMobile : bgVideoDesktop)

  useEffect(() => {
    setBgSource(isMobile ? bgVideoMobile : bgVideoDesktop)
  }, [isMobile])

  const handlePlay = useCallback(async () => {
    if (audioRef.current && audioRef.current.src != winMusic)
      audioRef.current.src = winMusic
    audioRef?.current?.play().then(() => setIsPlaying(true))
  }, [audioRef]);

  const handlePause = useCallback(async () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef?.current?.pause()
      setIsPlaying(false)
    }
  }, [audioRef]);

  useEffect(() => {
    handlePlay()
  }, [handlePlay]);

  const handleWalletConnect = () => {
    if (wallet.connected) {
      return navigate("/chat");
    } else {
      return setShowConnectWallet(true);
    }
  }

  return (
    <div className="relative w-full h-screen isolate ">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover object-center -z-10 "
        src={bgSource}
        autoPlay
        loop
        muted
      />

      <audio ref={audioRef} loop autoPlay hidden>
        <source src={winMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* <div className=" lg:hidden relative top-[50px] bg-green-700">
        <button
          onClick={handlePlayForSmallerDevices}
          className="  flex absolute top-0 left-[-50px] w-full h-full  justify-end text-white text-[20px] font-bold"
          style={{ zIndex: 1000 }}
        >
          {isPlaying ? (
            <IoVolumeMuteOutline className=" " />
          ) : (
            <VscUnmute className=" " />
          )}
        </button>
      </div> */}

      <Box className=' w-full z-50 flex justify-between  p-4  fixed left-0 top-0'>
        <Box></Box>
        <IconButton className=" relative aspect-square" onClick={isPlaying ? handlePause : handlePlay}>
          {isPlaying ? <VolumeOff className=" text-white" /> : <VolumeUp className=" text-white" />}
        </IconButton>
      </Box>

      <Box className='flex centre justify-center h-full w-full'>
        <Box className='m-auto'>
          <div className="text-white text-center flex flex-col justify-between">
            <img src={bottle} className="mx-auto w-[100px] h-auto" alt="bottle" />
            <h1 className="text-[40px] lg:text-[80px] font-bold font-jbm uppercase">
              chat
            </h1>
            <p className="text-[15px] lg:text-[24px] uppercase font-jbm">
              autism friendly chat interface from the future
            </p>
            {showConnectWallet ? (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`bg-white ${showVerifying ? "opacity-100" : "opacity-100"
                  } coming-soon-shadow text-[#0000FF]  uppercase font-jbm text-[15px] lg:text-[24px] p-2 lg:p-4 w-[90%] mx-auto mt-5 sm:w-full flex flex-col gap-2 ${showWalletTransactionsError &&
                  "bg-opacity-0 anti-coming-soon-shadow opacity-100"
                  }`}
              >
                {showVerifying ? <VerifyingMessage /> : (
                  <SolanaConnect
                    setShowVerifying={setShowVerifying}
                    setShowWalletTransactionsError={
                      setShowWalletTransactionsError
                    }
                  />
                )}
              </motion.div>
            ) : showWalletTransactionsError && showVerifying ? (
              <></>
            ) : (
              <button
                className="bg-white coming-soon-shadow text-[#0000FF] uppercase font-jbm text-[15px] lg:text-[24px] p-2 lg:p-4 w-[90%] mx-auto mt-5 sm:w-full"
                onClick={handleWalletConnect}  >
                connect n chat
              </button>
            )}
          </div>
        </Box>
      </Box>
      {/* <div className="lg:hidden absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0"></div> */}
    </div>
  )
}
