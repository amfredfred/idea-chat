import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface IPumpCard {
  Name: string;
  Symbol: string;
  Uri: string;
  Mint: string;
  BondingCurve: string;
  User: string;
}

export default function PumpCard(props: IPumpCard) {

  const fetchTokenInfo = async () => {
    const response = await axios.get(`https://rpc.api-pump.fun/token?token=${props.Mint}`);
    return response.data;
  };

  const tokenInfo = useQuery({ queryKey: [`token-${props.Mint}`], queryFn: fetchTokenInfo });

  return (
    <div key={`pool-${props.Mint}`} className="pump-card">
      <a className="w-full h-full absolute inset-0 z-[1]" href="#">
        {props.Name}
        {tokenInfo.isLoading && <p>Loading...</p>}
        {tokenInfo.isError && <p>Error loading data</p>}
      </a>
    </div>
  );
}
