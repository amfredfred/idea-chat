import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IPumpCoin } from "../common/types";
import { NavLink } from "react-router-dom";
import { formatNumber } from "../utils/format";

export default function PumpCard(pump: IPumpCoin) {
  return (
    <Box className="pump-card   bg-gray-900 rounded-lg  relative  ">
      <Box className=" flex gap-2 align-middle ">
        <NavLink
          to={`https://pump.fun/${pump.address}`}
          target="_blank"
          className="absolute inset-0 z-[1] flex"
        />
        <Box className="relative hover:cursor-pointer z-10">
          <Box className="flex items-center">
            <Box className="relative flex items-center" sx={{ width: 66, height: 66 }}>
              <img src={pump.logo} style={{ aspectRatio: '1/1' }} alt="Token Image" className=" aspect-square " height="100%" />
            </Box>
          </Box>
        </Box>

        <Box className="flex flex-col ml-3 flex-1 overflow-hidden  ">
          <Box className="flex items-center justify-between border-b pb-2 border-gray-600">
            <Box className="flex flex-col gap-y-2 overflow-hidden">
              <Box className="flex items-center gap-1">
                <Typography variant="body2" className="font-medium text-orange-100 whitespace-nowrap overflow-ellipsis line-clamp-1 !leading-[14px] mr-2">{pump.symbol}</Typography>
                <Typography variant="body2" className="font-normal text-gray-200 overflow-ellipsis line-clamp-1 text-xs !leading-[12px]">{pump.name}</Typography>
              </Box>
              <Box className="flex items-center gap-x-1 px-1 border-l ml-1 h-3 border-gray-500 z-10">
                <MessageIcon style={{ fill: '#686A6D', width: '12px', height: '12px' }} />
                <Typography variant="body2" className="text-gray-100 font-medium text-xs leading-none">{formatNumber(pump.reply_count)}</Typography>
              </Box>
            </Box>
          </Box>
          <Typography variant="body2" className="mt-2 text-gray-400 line-clamp-3">{pump.description}</Typography>

          <Box className="flex items-center z-10 mt-2">
            <Typography variant="body2" className="break-keep ml-1 md:ml-0 text-xs leading-none border-r border-gray-500 pr-1">
              <span className="!text-xs !leading-none inline-flex text-gray-200 font-medium">MC</span>&nbsp;
              <span className="!text-xs !leading-none inline-flex text-gray-200 font-medium">${formatNumber(pump.usd_market_cap)}</span>
            </Typography>
            <Box className="flex items-center gap-x-1 border-r border-gray-500 px-1 text-xs leading-none text-red-700">
              <ThumbDownIcon style={{ width: '12px', height: '12px' }} />
              <Typography variant="body2" className="text-red-700">29%</Typography>
            </Box>
            <Box className="flex items-center gap-x-1 px-1 text-xs leading-none text-green-700">
              <ThumbUpIcon style={{ width: '12px', height: '12px' }} />
              <Typography variant="body2" className="text-green-700">71%</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="flex items-center justify-start mt-2 gap-1">
        <Typography variant="caption" className="text-gray-200">HD: {formatNumber(pump.holder_count)}</Typography>
        &bull;
        <Typography variant="caption" className="text-gray-200">SP: {formatNumber(pump.total_supply)}</Typography>
        &bull;
        <Typography variant="caption" className="text-gray-200">PGS: {`${pump.progress}/1`}</Typography>
      </Box>
    </Box>
  );
}
