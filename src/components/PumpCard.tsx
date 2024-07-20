import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import Avatar from '@mui/material/Avatar';

import DummAvator from '../assets/bottle.png'
import { Stack } from "@mui/material";

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
    <div key={`pool-${props.Mint}`} className="pump-card flex gap-2">
      <a className="w-full h-full absolute inset-0 z-[1]" href="#">
        <Stack direction="row" spacing={2}>
          <div className="ant-progress ant-progress-status-success ant-progress-circle relative top-[-3px] right-[4px] origin-center rotate-[130deg]">
            <Avatar
              alt="Remy Sharp"
              src={DummAvator}
              sx={{ width: 56, height: 56 }}
            />
          </div>
          <Stack direction="column" spacing={2}>
            {props?.Name}
            {props?.Mint}
            <div className="flex flex-col ml-3 flex-1 overflow-hidden">
              <div className="flex items-center justify-between border-b pb-2 border-grey-600">
                <div className="flex flex-col gap-y-2 overflow-hidden">
                  <div className="flex">
                    <div className="!p-0 !m-0 !h-auto relative hover:cursor-pointer flex gap-x-1 overflow-hidden">
                      <span className="font-medium text-grey-50 whitespace-nowrap min-w-max overflow-ellipsis line-clamp-1 text-sm !leading-[14px]">pinky</span>
                      <span className="font-normal text-grey-200 overflow-ellipsis line-clamp-1 text-xs !leading-[12px]">pinky</span>
                    </div>
                    <div className="!p-0 !m-0 relative !ml-1 flex !h-[12px] z-10 hover:cursor-pointer">
                      <span className="material-icons text-grey-400">photo_camera</span>
                    </div>
                    <div className="flex items-center gap-x-1 px-1 border-l ml-1 h-3 border-grey-500 z-10">
                      <span className="material-icons text-grey-100">account_circle</span>
                      <span className="text-grey-100 font-medium text-xs leading-none">4</span>
                    </div>
                  </div>
                  <div className="flex items-center z-10">
                    <span className="break-keep ml-1 md:ml-0 text-xs leading-none border-r border-grey-500 pr-1">
                      <span className="!text-xs !leading-none inline-flex text-grey-200 font-medium">6m</span>
                    </span>
                    <div className="flex items-center gap-x-1 border-r border-grey-500 px-1 text-xs leading-none text-red-700">
                      <span className="material-icons">error</span>
                      <span>30%</span>
                    </div>
                    <div className="flex items-center gap-x-1 px-1 text-xs leading-none text-green-700">
                      <span className="material-icons">check_circle</span>
                      <span>21%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end min-w-[90px] flex-1">
                  <div className="flex items-center gap-x-1">
                    <span className="material-icons text-[#D4AE4B]">hourglass_empty</span>
                    <span className="text-xs font-medium text-[#D4AE4B] clipped-title-yellow">Migrating...</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 z-10">
                <div className="flex gap-x-[6px]">
                  <a className="text-grey-400 hover:text-grey-300" href="https://www.pump.fun/8AEXVg94JETz4yggkM22sX3ENWr2g4vMucH5bHbpump" target="_blank">
                    <button type="button" className="ant-btn ant-btn-default !rounded-full !border-none w-5 h-5 text-center !p-0 !m-0 !bg-grey-500">
                      <span className="material-icons text-grey-300">link</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </Stack>
        </Stack>
      </a>
    </div>
  );
}
