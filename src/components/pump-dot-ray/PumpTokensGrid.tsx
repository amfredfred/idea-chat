import { Box } from '@mui/material'
import { useAppSelector } from '../../libs/redux/hooks'
import PumpCard from './PumpCard'
import { filterAndSortPumpList } from '../../libs/redux/slices/pump-socket-slice'

export default function PumpTokensGrid() {

    const pools = useAppSelector(state => state?.pumpSocket.pumpList?.migrated)
    const filters = useAppSelector(state => state?.pumpSocket.searchParams.filter_listing)
    const pumplist = filterAndSortPumpList(pools, filters)

    return (
        <Box className="flex flex-col gap-4 overflow-auto  no-scrollbar relative h-full w-full">
            <Box className="grid grid-cols-1 md:grid-cols-3  items-start sm:grid-cols-2 max-sm:grid-cols-1 motion.divide-x divide-grey-500 gap-4 " maxHeight='100%' flexGrow='1'>
                {pumplist?.map(pump => <PumpCard key={pump.address} {...pump} />)}
            </Box>
        </Box>
    )
}
