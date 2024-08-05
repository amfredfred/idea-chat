import { Box } from '@mui/material'
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
        <Box className='flex flex-col gap-4 '>
            <Box className='flex justify-between centre text-center'>
                <Box className='flex flex-col'>
                    <strong>5m</strong>
                    <small>{formatNumber(pumpItem?.volume_5m ?? 0)}</small>
                </Box>
                <Box className='flex flex-col'>
                    <strong>1h</strong>
                    <small>{formatNumber(pumpItem?.volume_1h ?? 0)}</small>
                </Box>
                <Box className='flex flex-col'>
                    <strong>6h</strong>
                    <small>{formatNumber(pumpItem?.volume_6h ?? 0)}</small>
                </Box>
                <Box className='flex flex-col'>
                    <strong>24h</strong>
                    <small>{formatNumber(pumpItem?.volume_24h ?? 0)}</small>
                </Box>
            </Box>
            <div className="bg-gradient-center-white"></div>
            <Box display='flex' className=' flex-col  gap-4' width={'100%'}>
                <InfoItem left="ADDRESS" right={shortenString(String(pumpItem?.address))} />
                <div className="bg-gradient-center-white"></div>
                <InfoItem left="PRICE" right={`$${formatNumber(pumpItem?.price ?? 0)}`} />
                <div className="bg-gradient-center-white"></div>
                <InfoItem left="MCAP" right={`$${formatNumber(pumpItem?.market_cap ?? 0)}`} />
                <div className="bg-gradient-center-white"></div>
                <InfoItem left="LIQUIDITY" right={formatNumber(Number(pumpItem?.total_supply))} />
                <div className="bg-gradient-center-white"></div>
                <InfoItem left="VOLUME" right={`${formatNumber(pumpItem?.volume_24h ?? 0)}`} />
                <div className="bg-gradient-center-white"></div>
                <InfoItem left="HOLDERS" right={`${formatNumber(pumpItem?.holder_count ?? 0)}`} />
                <div className="bg-gradient-center-white"></div>
                <InfoItem left="DEV" right="LOCKED" />
            </Box>
        </Box>
    )
}
