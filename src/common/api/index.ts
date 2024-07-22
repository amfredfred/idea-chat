import { IPumpCoin, PumpDetail } from '../../types';


const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

export async function getPumpList(): Promise<IPumpCoin[]> {

  const params = new URLSearchParams({
    limit: '150',
    orderby: 'progress',
    direction: 'desc',
    pump: 'true',
  });

  const res = await fetch(`${corsProxyUrl}https://gmgn.ai/defi/quotation/v1/rank/sol/pump?${params.toString()}`, { cache: "no-store" });
  const data = await res.json()
  console.log({data})
  if (data.code === 0) {
    return data.data.rank
  }
  return []
}


export async function getPumpDetail(addr: string): Promise<PumpDetail> {
  const res = await fetch(`${corsProxyUrl}https://gmgn.ai/defi/quotation/v1/rank/sol/${addr}`)
  const data = await res.json()
  return (data.code === 0) ? data.data.token : {}
}