import { useEffect, useState } from "react";
import TokensNewlyCreated from "./TokensNewlyCreated";
import ToekensAboutToGraduate from "./ToekensAboutToGraduate";
import TokensGraduated from "./TokensGraduated";
import { IPumpRequestParams, PumpSocketReceived } from "../../common/types";
import usePumpScoket from "../../hooks/usePumpSocket";
import { useAppDispatch, useAppSelector } from "../../libs/redux/hooks";
import { setTokensList } from "../../libs/redux/slices/token-swap-slice";
import { Box, useMediaQuery } from "@mui/material";
import { connectSocket, setSocket } from "../../libs/redux/slices/pump-socket-slice";

export default function TokenExplorer() {

  const API_URL = import.meta.env.VITE_PUMP_SEVER_URL
  const dispatch = useAppDispatch()
  const { connected, pumpList } = useAppSelector(state => state.pumpSocket)

  // const { emitEvent, onEvent, connected } = usePumpScoket(API_URL);
  // const [pumpList, setPumpList] = useState<PumpSocketReceived['pumpList']>();

  const [searchParams,] = useState<IPumpRequestParams>({
    filter_listing: {},
    filter_migrated: {}
  }) //setSearchParams

  const isMobile = useMediaQuery("(max-width:768px)")
  // const isTablet = useMediaQuery("(max-width:999px)")

  const [selectedView, setSelectedView] = useState<'new' | 'about' | 'graduated'>('graduated');

  useEffect(() => {
    const disconnectSocket = dispatch(connectSocket(API_URL));
    return () => {
      disconnectSocket()
    };
  }, [dispatch, API_URL]);

  // useEffect(() => {
  //   return () => emitEvent('requestPumpList', searchParams);
  // }, [connected, emitEvent, searchParams])

  const newpumps = pumpList?.pump?.filter?.(pool => ((pool.created_timestamp * 1000) < Date.now() + 20e3) && (Number(pool.usd_market_cap) <= 40e3))
  const abouttograduate = pumpList?.pump?.filter?.(pool => (Number(pool.usd_market_cap) >= 40e3) && (Number(pool.usd_market_cap) < 59e3))

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
          {selectedView === 'new' && <TokensNewlyCreated pools={newpumps} />}
          {selectedView === 'about' && <ToekensAboutToGraduate pools={abouttograduate} />}
          {selectedView === 'graduated' && <TokensGraduated pools={pumpList?.migrated} />}
          {pumpsNavigation}
        </>
        ) : (<>
          <TokensNewlyCreated pools={newpumps} />
          <ToekensAboutToGraduate pools={abouttograduate} />
          <TokensGraduated pools={pumpList?.migrated} /></>
        )}
      </Box>
    </Box>
  )
}
