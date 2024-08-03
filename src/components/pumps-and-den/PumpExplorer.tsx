import { Box, IconButton, Typography } from "@mui/material";
import { useAppSelector } from "../../libs/redux/hooks";
import { motion } from 'framer-motion'
import PumpCard from "./PumpCard";
import { FilterAlt } from "@mui/icons-material";

export default function TokenExplorer() {
  const pools = useAppSelector(state => state?.pumpSocket.pumpList?.migrated)
  const theme = useAppSelector(state => state?.theme.current.styles)

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className="container overflow-hidden mx-auto flex h-full"  >
      <Box className="flex flex-col md:p-3 h-full  overflow-hidden w-full ">
        <Box className="flex items-center justify-between mb-4">
          <Box display='flex' flexDirection='column' gap='.6rem' alignContent='center'>
            <Box display='flex' gap='.6rem' alignContent='center' >
              <Typography variant="h5" className=" text-[20px]" ><strong> Pump.Ray </strong> </Typography>
            </Box>
            <Typography variant="body2" className=" text-[20px]" >Latest pump.fun tokens to hit raydium</Typography>
          </Box>
          <Box>
            <IconButton sx={{ border: 'solid thin', borderColor: theme.textColor }}>
              <FilterAlt sx={{ color: theme.textColor }} />
            </IconButton>
          </Box>
        </Box>
        <Box className="flex flex-col gap-4 overflow-auto  no-scrollbar">
          <Box className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-1 motion.divide-x divide-grey-500 gap-4 " maxHeight='100%' flexGrow='1'>
            {pools?.map(pump => <PumpCard key={pump.address} {...pump} />)}
          </Box>
        </Box>
      </Box>
    </motion.div>
  )
}
