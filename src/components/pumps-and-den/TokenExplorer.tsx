import { useEffect, useState } from "react";
import TokensNewlyCreated from "./TokensNewlyCreated";
import ToekensAboutToGraduate from "./ToekensAboutToGraduate";
import TokensGraduated from "./TokensGraduated";
import { IPumpRequestParams, PumpSocketReceived } from "../../common/types";
import usePumpScoket from "../../hooks/usePumpSocket";
import { useAppDispatch } from "../../libs/redux/hooks";
import { setTokensList } from "../../libs/redux/slices/token-swap-slice";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from "@mui/material";

export default function TokenExplorer() {

  const API_URL = import.meta.env.VITE_PUMP_SEVER_URL
  const dispatch = useAppDispatch()

  const { emitEvent, onEvent, connected } = usePumpScoket(API_URL);
  const [pumpList, setPumpList] = useState<PumpSocketReceived['pumpList']>();
  const [searchParams, setearchParams] = useState<IPumpRequestParams>({
    filter_listing: {},
    filter_migrated: {}
  })

  useEffect(() => {
    return onEvent('pumpList', (data) => {
      setPumpList(data)
      dispatch(setTokensList(data?.migrated))
    });
  }, [onEvent, dispatch]);

  useEffect(() => {
    return () => emitEvent('requestPumpList', searchParams);
  }, [connected, emitEvent, searchParams, setearchParams])

  const newpumps = pumpList?.pump?.filter?.(pool => ((pool.created_timestamp * 1000) < Date.now() + 20e3) && (Number(pool.usd_market_cap) <= 40e3))
  const abouttograduate = pumpList?.pump?.filter?.(pool => (Number(pool.usd_market_cap) >= 40e3) && (Number(pool.usd_market_cap) < 59e3))
  // const isMobile = useMediaQuery('(max-width:500px)');

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className='flex-grow  container '
      breakpoints={{
        1200: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        500: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }}
    >
      <SwiperSlide>
        <TokensNewlyCreated pools={newpumps} />
      </SwiperSlide>
      <SwiperSlide >
        <ToekensAboutToGraduate pools={abouttograduate} />
      </SwiperSlide>
      <SwiperSlide>
        <TokensGraduated pools={pumpList?.migrated} />
      </SwiperSlide>
      {/*  className="grid grid-cols-1 md:grid-cols-3 divide-x divide-grey-500  mx-auto" */}
    </Swiper>
  )
}