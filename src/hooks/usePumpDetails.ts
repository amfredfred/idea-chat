import useSwr from "swr"
import { PumpDetail } from "../types"
import { fetcher } from "../utils/request"

export function usePumpDetail(address: string) {
    return useSwr<PumpDetail>(address && `/api/pump/${address}`, fetcher)
}