import { useEffect, useState } from "react";
import TokensNewlyCreated from "./TokensNewlyCreated";
import ToekensAboutToGraduate from "./ToekensAboutToGraduate";
import TokensGraduated from "./TokensGraduated";
import { IPumpRequestParams, PumpSocketReceived } from "../../common/types";
import usePumpScoket from "../../hooks/usePumpSocket";
import { useAppDispatch } from "../../libs/redux/hooks";
import { setTokensList } from "../../libs/redux/slices/token-swap-slice";

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

  return (
    <div className='flex-grow  '>
      <div className="container grid grid-cols-1 md:grid-cols-3 divide-x divide-grey-500  mx-auto">
        <TokensNewlyCreated pools={newpumps} />
        <ToekensAboutToGraduate pools={abouttograduate} />
        <TokensGraduated pools={pumpList?.migrated} />
      </div>
    </div>
  )
}