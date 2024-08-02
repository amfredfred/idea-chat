import { Map } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { PieChart } from '@mui/x-charts'

export default function PumpHolders() {
    return (
        <Box className=' flex-col  gap-4 m-auto  flex justify-center  ' width={'100%'} alignItems='center'>
            <Box sx={{ width:'100%' }}>
                <PieChart
                    height={300}
                    className=' m-auto   flex centre justify-center'
                    series={[
                        {
                            startAngle: -280,
                            data: [{ value: 60, label: '', color: '#00FF00', }, { value: 10, color: '#FFFFFF' }, { value: 30, color: '#F7FF05' }],
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
