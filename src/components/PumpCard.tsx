import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IPumpCoin } from "../types";


export default function PumpCard(pump: IPumpCoin) {

  return (
    <Box className="pump-card" position="relative" width="100%">
      <a className="w-full h-full absolute inset-0 z-[1] flex " href="/terminal?chainId=1399811149&amp;address=Ab6c1CRrDizcLN3tmPhwhE1CYzht3dg14JvdzS3Npump"></a>
      <Box className="!p-0 !m-0 !h-auto relative hover:cursor-pointer z-10">
        <Box className="inset-[3px] pump-vision-card-image">
          <Box className="relative flex items-center" sx={{ width: 66, height: 66 }}>
            <img src={pump.logo} alt="Token Image" className="rounded-full bg-grey-900 absolute top-0 left-0 aspect-square overflow-hidden border border-black block" width="66" height="66" />
          </Box>
        </Box>
        <Box component="span" className="absolute right-1 bottom-1">
          <MessageIcon style={{ fill: '#459C6E', width: '15px', height: '15px' }} />
        </Box>
      </Box>


      <Box className="flex flex-col ml-3 flex-1 overflow-hidden">
        <Box className="flex items-center justify-between border-b pb-2 border-grey-600">
          <Box className="flex flex-col gap-y-2 overflow-hidden">
            <Box className="flex">
              <Typography variant="body2" className="font-medium text-grey-50 whitespace-nowrap min-w-max overflow-ellipsis line-clamp-1 !leading-[14px]">{pump?.symbol}</Typography>
              <Typography variant="body2" className="font-normal text-grey-200 overflow-ellipsis line-clamp-1 text-xs !leading-[12px]">{pump?.name}</Typography>
            </Box>
            <Box className="flex items-center gap-x-1 px-1 border-l ml-1 h-3 border-grey-500 z-10">
              <MessageIcon style={{ fill: '#686A6D', width: '12px', height: '12px' }} />
              <Typography variant="body2" className="text-grey-100 font-medium text-xs leading-none">112</Typography>
            </Box>
          </Box>
        </Box>
        <Box className="flex items-center z-10">
          <Typography variant="body2" className="break-keep ml-1 md:ml-0 text-xs leading-none border-r border-grey-500 pr-1">
            <span className="!text-xs !leading-none inline-flex text-grey-200 font-medium">1h</span>
          </Typography>
          <Box className="flex items-center gap-x-1 border-r border-grey-500 px-1 text-xs leading-none text-red-700">
            <ThumbDownIcon style={{ width: '12px', height: '12px' }} />
            <Typography variant="body2" className="text-red-700">29%</Typography>
          </Box>
          <Box className="flex items-center gap-x-1 px-1 text-xs leading-none text-red-700">
            <ThumbUpIcon style={{ width: '12px', height: '12px' }} />
            <Typography variant="body2" className="text-red-700">71%</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
