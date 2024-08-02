import { useState } from "react";
import TokensNewlyCreated from "./TokensNewlyCreated";
import ToekensAboutToGraduate from "./ToekensAboutToGraduate";
import TokensGraduated from "./TokensGraduated";
import { Box, useMediaQuery } from "@mui/material";
import { motion } from 'framer-motion'

export default function TokenExplorer() {
  const isMobile = useMediaQuery("(max-width:768px)")
  // const isTablet = useMediaQuery("(max-width:999px)")

  const [selectedView, setSelectedView] = useState<'new' | 'about' | 'graduated'>('graduated');

  const pumpsNavigation = (
    <motion.div initial={{  opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className='flex justify-between h-16'>
      <Box className=" flex-grow h-full flex place-content-center place-items-center cursor-pointer" onClick={() => setSelectedView('new')}>
        <small>New</small>
      </Box>
      <Box className=" flex-grow h-full flex place-content-center place-items-center cursor-pointer" onClick={() => setSelectedView('about')}>
        <small>About To Graduate</small>
      </Box>
      <Box className=" flex-grow h-full flex place-content-center place-items-center cursor-pointer" onClick={() => setSelectedView('graduated')}>
        <small>Graduated</small>
      </Box>
    </motion.div >
  );

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="container overflow-hidden mx-auto flex h-full"  >
      <Box className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 motion.divide-x divide-grey-500 " maxHeight='100%' flexGrow='1'>
        {isMobile ? (<>
          {selectedView === 'new' && <TokensNewlyCreated />}
          {selectedView === 'about' && <ToekensAboutToGraduate />}
          {selectedView === 'graduated' && <TokensGraduated />}
          {pumpsNavigation}
        </>
        ) : (<>
          <TokensNewlyCreated />
          <ToekensAboutToGraduate />
          <TokensGraduated /></>
        )}
      </Box>
    </motion.div>
  )
}
