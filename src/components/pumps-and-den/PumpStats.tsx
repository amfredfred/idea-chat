import { Box, Divider } from '@mui/material'
import { formatNumber } from '../../utils/format'
import { useAppSelector } from '../../libs/redux/hooks'
import { shortenString } from '../../utils'

export default function PumpStats() {

    const pumpItem = useAppSelector(state => state.pumpChart.pumpItem)

    const InfoItem = ({ left, right }: { left: string, right: string }) =>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Box>
                {left}
            </Box>
            <Box>
                {right}
            </Box>
        </Box>

    return (
        <Box display='flex' className=' flex-col  gap-4' width={'100%'}>
            <InfoItem left="ADDRESS" right={shortenString(String(pumpItem?.address))} />
            <Divider />
            <InfoItem left="PRICE" right={`$${formatNumber(pumpItem?.price ?? 0)}`} />
            <Divider />
            <InfoItem left="MCAP" right={`$${formatNumber(pumpItem?.marketCap ?? 0)}`} />
            <Divider />
            <InfoItem left="LIQUIDITY" right={formatNumber(Number(pumpItem?.totalSupply))} />
            <Divider />
            <InfoItem left="VOLUME" right={`${formatNumber(pumpItem?.tradingVolume ?? 0)}`} />
            <Divider />
            <InfoItem left="HOLDERS" right={`${formatNumber(pumpItem?.holdersCount ?? 0)}`} />
            <Divider />
            <InfoItem left="DEV" right="LOCKED" />
        </Box>
    )
}
