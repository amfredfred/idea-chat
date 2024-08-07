import { Box } from '@mui/material'
import { formatNumber } from '../../utils/format'
import { useAppSelector } from '../../libs/redux/hooks'
import { calculatePumpTokenChanges, shortenString } from '../../utils'
import { ReactNode } from 'react'
import CopyTextButton from '../buttons/CopyTextButton'

export default function PumpStats() {

    const pumpItem = useAppSelector(state => state.pumpChart.pumpItem)
    const theme = useAppSelector(state => state.theme.current.styles)
    const percentage_changes = calculatePumpTokenChanges(pumpItem as any);

    const InfoItem = ({ left, right }: { left: ReactNode, right: ReactNode }) =>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Box style={{ color: theme.text_color }}>
                {left}
            </Box>
            <Box style={{ color: theme.text_color }}>
                {right}
            </Box>
        </Box>

    return (
        <Box className='flex flex-col gap-4 '>
            <Box className='flex justify-between centre text-center'>
                <Box className='flex flex-col'>
                    <strong style={{ color: theme.text_color }}>5m</strong>
                    <small style={{ color: theme.text_color }}>{percentage_changes.change5m}%</small>
                </Box>
                <Box className='flex flex-col'>
                    <strong style={{ color: theme.text_color }}>1h</strong>
                    <small style={{ color: theme.text_color }}>{percentage_changes.change1h}%</small>
                </Box>
                <Box className='flex flex-col'>
                    <strong style={{ color: theme.text_color }}>6h</strong>
                    <small style={{ color: theme.text_color }}>{percentage_changes.change6h}%</small>
                </Box>
                <Box className='flex flex-col'>
                    <strong style={{ color: theme.text_color }}>24h</strong>
                    <small style={{ color: theme.text_color }}>{percentage_changes.change24h}%</small>
                </Box>
            </Box>
            <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1 }}></div>
            <Box display='flex' className=' flex-col  gap-4' width={'100%'}>
                <InfoItem left="ADDRESS" right={<CopyTextButton buttonText={shortenString(String(pumpItem?.address))} textToCopy={String(pumpItem?.address)} />} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1 }}></div>
                <InfoItem left="PRICE" right={`$${formatNumber(pumpItem?.price ?? 0)}`} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1 }}></div>
                <InfoItem left="MCAP" right={`$${formatNumber(pumpItem?.market_cap ?? 0)}`} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1 }}></div>
                <InfoItem left="LIQUIDITY" right={`$${formatNumber(Number(pumpItem?.pool_info.liquidity))}`} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1 }}></div>
                <InfoItem left="VOLUME" right={`$${formatNumber(pumpItem?.volume_24h ?? 0)}`} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1 }}></div>
                <InfoItem left="HOLDERS" right={`${formatNumber(pumpItem?.holder_count ?? 0)}`} />
                <div style={{ backgroundImage: `linear-gradient(to right, transparent, ${theme.text_color}, transparent)`, height: 1 }}></div>
                <InfoItem left="DEV" right="LOCKED" />
            </Box>
        </Box>
    )
}
