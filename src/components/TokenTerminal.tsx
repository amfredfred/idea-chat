import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getPumpDetail } from '../api';
import { useEffect, useState } from 'react';

export default function TokenTerminal() {
  const [searchParams] = useSearchParams();
  const [shouldFetch, setShoutFetch] = useState<boolean>(false)

  // Get the value of the 'mint' query parameter
  const mint = searchParams.get('mint');

  const tokenInfoQuery = useQuery({
    queryKey: [`token-${mint}`],
    queryFn: () => getPumpDetail(mint as string),
    enabled: shouldFetch
  })

  useEffect(() => { if (mint) setShoutFetch(true) }, [mint])

  useEffect(() => {

    console.log(tokenInfoQuery.data)

  }, [tokenInfoQuery.data])

  return (
    <div>
      <h2>Token Exploration Page</h2>
      <p>Mint query parameter value: {mint}</p>
      <div className="">
        {tokenInfoQuery.status}
        {tokenInfoQuery.isFetching ? 'Loading Data...' : JSON.stringify(tokenInfoQuery.data)}
      </div>
    </div>
  );
}
