import { useState } from "react";
import TokensNewlyCreated from "./TokensNewlyCreated";
import ToekensAboutToGraduate from "./ToekensAboutToGraduate";
import TokensGraduated from "./TokensGraduated";
import { Box, useMediaQuery } from "@mui/material";

export default function TokenExplorer() {
  const isMobile = useMediaQuery("(max-width:768px)")
  // const isTablet = useMediaQuery("(max-width:999px)")

  const [selectedView, setSelectedView] = useState<'new' | 'about' | 'graduated'>('graduated');

  const pumpsNavigation = (
    <Box display="flex" justifyContent="space-between" className=' h-16'>
      <Box className=" flex-grow h-full flex place-content-center place-items-center cursor-pointer" onClick={() => setSelectedView('new')}>
        <small>New</small>
      </Box>
      <Box className=" flex-grow h-full flex place-content-center place-items-center cursor-pointer" onClick={() => setSelectedView('about')}>
        <small>About To Graduate</small>
      </Box>
      <Box className=" flex-grow h-full flex place-content-center place-items-center cursor-pointer" onClick={() => setSelectedView('graduated')}>
        <small>Graduated</small>
      </Box>
    </Box >
  );

  return (
    <Box className="container overflow-hidden mx-auto flex h-full"  >
      <Box className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 divide-x divide-grey-500 " maxHeight='100%' flexGrow='1'>
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
    </Box>
  )
}
