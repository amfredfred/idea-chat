import { Map } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { PieChart } from '@mui/x-charts'

export default function PumpHolders() {
    return (
        <Box className=' flex-col  gap-4 m-auto  flex justify-center' width={'100%'}>
            <PieChart
                width={300}
                height={300}
                className=' m-auto'
                series={[
                    {
                        data: [{ value: 10 }, { value: 15 }, { value: 20 }],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 180,
                        cx: 150,
                        cy: 150,
                    }
                ]} />
            <Button variant="outlined" className="flex align-middle gap-2 justify-center"   >
                <Map /> View on bubblemaps
            </Button>
        </Box>
    )
}
