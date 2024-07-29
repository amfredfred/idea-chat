import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PumpDetails() {
  const [searchParams] = useSearchParams();
  const [mint, setMint] = useState<string | null>('')
  const mintParam = searchParams.get('mint');

  useEffect(() => {
    setMint(mintParam)
  }, [mintParam])

  return (
    <div>
      <h2>Token Exploration Page</h2>
      <p>Mint query parameter value: {mint}</p>
      <div className="">
        <iframe src={`https://pump.fun/${mintParam}`} style={{width:'100%', height:'100vh'}}></iframe>
      </div>
    </div>
  );
}