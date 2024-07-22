import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getPumpDetail } from './common/api'
import { useEffect, useState } from 'react';
import { IPumpCoin } from './types';

export default function PumpDetails() {
  const [searchParams] = useSearchParams();
  const [shouldFetch, setShoutFetch] = useState<boolean>(false)
  const [mintInfo, setmintInfo] = useState<IPumpCoin>()

  // Get the value of the 'mint' query parameter
  const mint = searchParams.get('mint');

  const tokenInfoQuery = useQuery({
    queryKey: [`token-${mint}`],
    queryFn: () => getPumpDetail(mint as string),
    enabled: shouldFetch,
    refetchInterval: 1000
  })

  useEffect(() => {
    if (mint) setShoutFetch(true)
  }, [mint])

  useEffect(() => {
    if (tokenInfoQuery.data) setmintInfo(tokenInfoQuery.data)
  }, [tokenInfoQuery.data])

  return (
    <div>
      <h2>Token Exploration Page</h2>
      <p>Mint query parameter value: {mint}</p>
      <div className="">
        {tokenInfoQuery.status}
        {JSON.stringify(mintInfo)}
      </div>
    </div>
  );
}
