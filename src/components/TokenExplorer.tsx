import { useEffect, useState } from "react";
import TokensNewlyCreated from "./TokensNewlyCreated";
import ToekensAboutToGraduate from "./ToekensAboutToGraduate";
import TokensGraduated from "./TokensGraduated";
import { useQuery } from "@tanstack/react-query";
import { getPumpList } from "../api";
import { IPumpCoin } from "../types";

export default function TokenExplorer() {

  const [newPools, setNewPools] = useState<IPumpCoin[]>([])
  const pumpListQuery = useQuery({
    queryKey: ['pump-tokens'],
    queryFn: getPumpList,
    refetchInterval: 1000
  })

  useEffect(() => {
    if (pumpListQuery.data) setNewPools(pumpListQuery.data.reverse())
  }, [pumpListQuery.data])

  return (
    <div className='flex-grow  '>
      <div className="container grid grid-cols-1 md:grid-cols-3 divide-x divide-grey-500  mx-auto">
        <TokensNewlyCreated pools={newPools} />
        <ToekensAboutToGraduate pools={newPools.filter(pool => Number(pool.usd_market_cap) >= 40e3)} />
        <TokensGraduated pools={newPools.filter(pool => Number(pool.usd_market_cap) >= 59e3)} />
      </div>
    </div>
  )
}