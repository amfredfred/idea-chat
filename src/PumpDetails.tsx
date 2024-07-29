import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { IPumpCoin } from './common/types';

export default function PumpDetails() {
  const [searchParams] = useSearchParams();
  const [mintInfo, setmintInfo] = useState<IPumpCoin>()

  // Get the value of the 'mint' query parameter
  const mint = searchParams.get('mint');

  return (
    <div>
      <h2>Token Exploration Page</h2>
      <p>Mint query parameter value: {mint}</p>
      <div className="">
        {JSON.stringify(mintInfo)}
        MINT: {mint}
      </div>
    </div>
  );
}
