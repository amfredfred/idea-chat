import { PumpCoin } from '../types'; // Adjust the import path as necessary

export async function getPumpList(): Promise<PumpCoin[]> {

  const params = new URLSearchParams({
    limit: '50',
    orderby: 'progress',
    direction: 'desc',
    pump: 'true',
  });

  const url = `https://gmgn.ai/defi/quotation/v1/rank/sol/pump?${params.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {},
    cache: "no-store"
  });

  const data = await res.json()
  if (data.code === 0) {
    return data.data.rank
  }
  return []
}


export async function getPumpDetail(addr: string): Promise<PumpDetail> {
  const res = await fetch(`https://gmgn.ai/defi/quotation/v1/tokens/sol/${addr}`)
  const data = await res.json()
  if (data.code === 0) {
    return data.data.token
  }
}
