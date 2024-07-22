import { useEffect, useState } from "react";
import { IPumpCard } from "./PumpCard";
import TokensNewlyCreated from "./TokensNewlyCreated";
import ToekensAboutToGraduate from "./ToekensAboutToGraduate";
import TokensGraduated from "./TokensGraduated";
import io from 'socket.io-client'
import { useQuery } from "@tanstack/react-query";
import { getPumpList } from "../api";

export default function TokenExplorer() {

  const [newPools, setNewPools] = useState<IPumpCard[]>([])


   const pumpListQuery = useQuery({
     queryKey: ['pump-tokens'],
     queryFn: getPumpList
   })


  const addNewPool = (pool: IPumpCard) => {
    console.log({ pool })
    setNewPools(prevPools => {
      const poolExists = prevPools.some(existingPool => existingPool.Uri === pool.Uri);
      if (!poolExists) {
        return [pool, ...prevPools];
      }
      return prevPools;
    });
  };

  useEffect(() => {

     console.log(pumpListQuery.data)
      console.log(pumpListQuery.error);


  }, [pumpListQuery.status])


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