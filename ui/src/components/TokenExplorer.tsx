import { useEffect, useState } from "react";
import TokensNewlyCreated from "./TokensNewlyCreated";
import ToekensAboutToGraduate from "./ToekensAboutToGraduate";
import TokensGraduated from "./TokensGraduated";
import { IPumpCoin } from "../common/types";
import usePumpScoket from "../hooks/usePumpSocket";

export default function TokenExplorer() {

  const { emitEvent, onEvent, connected } = usePumpScoket('http://localhost:3000');
  const [pumpList, setPumpList] = useState<IPumpCoin[]>([]);

  useEffect(() => {
    return onEvent('pumpList', (data) => setPumpList(data));
  }, [onEvent]);

  useEffect(() => {
    console.log({ connected })
    return () => emitEvent('requestPumpDetails');
  }, [connected, emitEvent])

  const newpumps = pumpList.filter(pool => ((pool.created_timestamp * 1000) < Date.now() + 20e3) && (Number(pool.usd_market_cap) <= 40e3))
  const abouttograduate = pumpList.filter(pool => (Number(pool.usd_market_cap) >= 40e3) && (Number(pool.usd_market_cap) < 59e3))
  const graduatedpumps = pumpList.filter(pool => ((Number(pool.usd_market_cap) >= 59e3) || (pool.complete >= 0.8)))

  return (
    <div className='flex-grow  '>
      <div className="container grid grid-cols-1 md:grid-cols-3 divide-x divide-grey-500  mx-auto">
        <TokensNewlyCreated pools={newpumps} />
        <ToekensAboutToGraduate pools={abouttograduate} />
        <TokensGraduated pools={graduatedpumps} />
      </div>
    </div>
  )
}