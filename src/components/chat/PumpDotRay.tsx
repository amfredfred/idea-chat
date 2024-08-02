import { Box } from '@mui/material'
import TokenExplorer from '../pumps-and-den/TokenExplorer'
import { useAppSelector } from '../../libs/redux/hooks';
import PumpChart from '../pumps-and-den/PumpChart';

export default function PumpDotRay() {

    const isPumpChartShown = useAppSelector(state => state.pumpChart.isPumpChartShown);

    return (
        <Box width='100%'>
            {isPumpChartShown ? <PumpChart /> : <TokenExplorer />}
        </Box>
    )
}