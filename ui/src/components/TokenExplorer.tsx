import { useEffect, useState } from "react";
import TokensNewlyCreated from "./TokensNewlyCreated";
import ToekensAboutToGraduate from "./ToekensAboutToGraduate";
import TokensGraduated from "./TokensGraduated";
// import { useQuery } from "@tanstack/react-query";
// import { getPumpList } from "../common/api";
import { IPumpCoin } from "../common/types";
import usePumpScoket from "../hooks/usePumpSocket";

export default function TokenExplorer() {

  const [newPools, setNewPools] = useState<IPumpCoin[]>([])
  // const pumpListQuery = useQuery({
  //   queryKey: ['pump-tokens'],
  //   queryFn: getPumpList,
  //   refetchInterval: 5000
  // })

  // useEffect(() => {
  //   if (pumpListQuery.data) setNewPools(pumpListQuery.data.reverse())
  // }, [pumpListQuery.data])
  
  const { emitEvent, onEvent } = usePumpScoket('http://localhost:3000');
  const [pumpList, setPumpList] = useState<IPumpCoin[]>([]);

  useEffect(() => {
    const handlePumpList = (data: any[]) => {
      setPumpList(data);
    };

    const cleanup = onEvent('pumpList', handlePumpList);

    return cleanup;
  }, [onEvent]);

  useEffect(() => {
    const requestPumpList = () => {
      emitEvent('requestPumpList');
    };
 })

  return (
    <div className='flex-grow  '>
      <div className="container grid grid-cols-1 md:grid-cols-3 divide-x divide-grey-500  mx-auto">
        <TokensNewlyCreated pools={pumpList} />
        <ToekensAboutToGraduate pools={pumpList.filter(pool => (Number(pool.usd_market_cap) >= 40e3))} />
        <TokensGraduated pools={pumpList.filter(pool => ((Number(pool.usd_market_cap) >= 59e3) || (pool.complete >= 0.8)))} />
      </div>
    </div>
  )
}