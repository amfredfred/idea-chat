import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DummAvator from '../assets/bottle.png'
import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import UploadIcon from '@mui/icons-material/Upload';

// import WebSocket from 'ws';


export interface IPumpCard {
  Name: string;
  Symbol: string;
  Uri: string;
  Mint: string;
  BondingCurve: string;
  User: string;
}

export default function PumpCard(props: IPumpCard) {

  const tokenInfoQuery = useQuery({
    queryKey: [`token-${props.Mint}`],
    queryFn: async () => await axios.get(`https://pumpapi.fun/api/get_metadata/9QUYvUGiqCALxrMCyJrVYXtJSpt4BYzPRv5ZRjsdqzkh`)
  });

  const [tokenInfo, setTokenInfo] = useState()


  useEffect(() => {
    console.log(String(tokenInfoQuery.error))
  }, [tokenInfoQuery.status])


  return (
    <Box className="pump-card" position="relative" width="100%">
      <a className="w-full h-full absolute inset-0 z-[1]" href="/terminal?chainId=1399811149&amp;address=Ab6c1CRrDizcLN3tmPhwhE1CYzht3dg14JvdzS3Npump"></a>
      <Box className="!p-0 !m-0 !h-auto relative hover:cursor-pointer z-10">
        <Box className="ant-progress ant-progress-status-normal ant-progress-circle relative top-[-3px] right-[4px] origin-center rotate-[130deg]" >
          <Box className="ant-progress-inner" sx={{ width: 72, height: 72, fontSize: '16.8px' }}>
            <svg className="ant-progress-circle" viewBox="0 0 100 100" role="presentation">
              <circle className="ant-progress-circle-trail" r="47.5" cx="50" cy="50" stroke="#1C402D" strokeLinecap="round" strokeWidth="5" style={{ strokeDasharray: '298.451px, 298.451', strokeDashoffset: 0, transform: 'rotate(-90deg)', transformOrigin: '50px 50px', transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity 0.3s ease 0s', fillOpacity: 0 }}></circle>
              <circle className="ant-progress-circle-path" r="47.5" cx="50" cy="50" strokeLinecap="round" strokeWidth="5" opacity="1" style={{ stroke: '#459C6E', strokeDasharray: '298.451px, 298.451', strokeDashoffset: 14.4381, transform: 'rotate(-90deg)', transformOrigin: '50px 50px', transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s ease 0s, stroke-width 0.06s ease 0.3s, opacity ease 0s', fillOpacity: 0 }}></circle>
            </svg>
          </Box>
        </Box>
        <Box className="!absolute inset-[3px] pump-vision-card-image">
          <Box className="relative flex items-center" sx={{ width: 66, height: 66 }}>
            <img src="https://image.bullx.io/1399811149/Ab6c1CRrDizcLN3tmPhwhE1CYzht3dg14JvdzS3Npump" alt="Token Image" className="rounded-full bg-grey-900 absolute top-0 left-0 aspect-square overflow-hidden border border-black block" width="66" height="66" />
          </Box>
          <a target="_blank" href="https://lens.google.com/uploadbyurl?url=https://image.bullx.io/1399811149/Ab6c1CRrDizcLN3tmPhwhE1CYzht3dg14JvdzS3Npump" className="google-lens items-center justify-center h-full w-full absolute inset-0 bg-black bg-opacity-70 rounded-full">
            <UploadIcon style={{ fill: '#58C88D', width: '24px', height: '24px' }} />
          </a>
        </Box>
        <Box component="span" className="absolute right-1 bottom-1">
          <MessageIcon style={{ fill: '#459C6E', width: '15px', height: '15px' }} />
        </Box>
      </Box>
      <Box className="flex flex-col ml-3 flex-1 overflow-hidden">
        <Box className="flex items-center justify-between border-b pb-2 border-grey-600">
          <Box className="flex flex-col gap-y-2 overflow-hidden">
            <Box className="flex">
              <Typography variant="body2" className="font-medium text-grey-50 whitespace-nowrap min-w-max overflow-ellipsis line-clamp-1 !leading-[14px]">{props?.Symbol}</Typography>
              <Typography variant="body2" className="font-normal text-grey-200 overflow-ellipsis line-clamp-1 text-xs !leading-[12px]">{props?.Name}</Typography>
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
