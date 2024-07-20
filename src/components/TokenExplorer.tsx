import { useEffect, useState } from "react";
import { IPumpCard } from "./PumpCard";
import TokensNewlyCreated from "./TokensNewlyCreated";
import ToekensAboutToGraduate from "./ToekensAboutToGraduate";
import TokensGraduated from "./TokensGraduated";

export default function TokenExplorer() {

  const [newPools, setNewPools] = useState<IPumpCard[]>([])

  const addNewPool = (pool: IPumpCard) => {
    console.log({ pool })
    setNewPools(prevPools => {
      const poolExists = prevPools.some(existingPool => existingPool.Uri === pool.Uri);
      if (!poolExists) {
        return [...prevPools, pool];
      }
      return prevPools;
    });
  };

  useEffect(() => {

    const ws = new WebSocket('wss://rpc.api-pump.fun/ws');

    ws!.onopen = function () {

      // Subscribing to new pools
      const payload = {
        method: "subscribeNewPools",
        params: []
      }
      ws.send(JSON.stringify(payload));

    };

    ws!.onmessage = function ({ data }) {
      try {
        const pool = JSON.parse(data)
        addNewPool(pool)
      } catch (error) {
        console.log({ error })
      }
    };
  }, [])


  return (
    <div className='flex-grow  '>
      <div className="container grid grid-cols-1 md:grid-cols-3 divide-x divide-grey-500  mx-auto">
        <TokensNewlyCreated pools={newPools} />
        <ToekensAboutToGraduate pools={newPools} />
        <TokensGraduated pools={newPools} />
      </div>
    </div>
  )
}