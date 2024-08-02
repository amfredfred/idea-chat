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
            <InfoItem left="MCAP" right={`$${formatNumber(pumpItem?.usd_market_cap ?? 0)}`} />
            <Divider />
            <InfoItem left="LIQUIDITY" right={formatNumber(Number(pumpItem?.total_supply))} />
            <Divider />
            <InfoItem left="VOLUME  1H" right={`${formatNumber(pumpItem?.volume_1h ?? 0)}`} />
            <Divider />
            <InfoItem left="HOLDERS" right={`${formatNumber(pumpItem?.holder_count ?? 0)}`} />
            <Divider />
            <InfoItem left="DEV" right="LOCKED" />
        </Box>
    )
}
