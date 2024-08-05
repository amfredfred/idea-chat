import { Map } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { PieChart } from '@mui/x-charts'
import { useAppSelector } from '../../libs/redux/hooks'

export default function PumpHolders() {

    const pumpHolders = useAppSelector(app => app.pumpChart.pumpItem?.holders_info)

    const pieData = [
        { value: pumpHolders?.top10_holders_percentage.data ?? 0, label: 'TOP 10', color: '#00FF00', },
        { value: pumpHolders?.top50_holders_percentage.data ?? 0, label: 'TOP 50', color: '#FFFFFF' },
        { value: pumpHolders?.others_holders_percentage.data ?? 0, label: 'OTHERS', color: '#F7FF05' }
    ]

    return (
        <Box className=' flex-col  gap-4 m-auto  flex justify-center  ' width={'100%'} alignItems='center'>
            <Box sx={{ width: '100%' }}>
                <PieChart
                    height={300}
                    className=' m-auto   flex centre justify-center'
                    series={[
                        {
                            startAngle: -280,
                            data: pieData,
                            innerRadius: 90,
                            arcLabel: (params) => params.label ?? '',
                            cx: 150,
                            cy: 150,
                        },
                    ]}
                />
            </Box>
            <Button variant="outlined" className="flex align-middle gap-2 justify-center  w-full"   >
                <Map /> View on bubblemaps
            </Button>
        </Box>
    )
}
