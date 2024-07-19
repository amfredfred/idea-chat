import { Box } from "@mui/material"
import NFTIcon from '@src/assets/nft-icon.png'

export interface ITokenItemBlock {
  index: number,
  token: number
}


export default function TokenItemBlock(props: ITokenItemBlock) {

  return (
    <Box sx={{ maxWidth: '100%' }} className=' w-full  bg-black border-b-2 border-b-current '>
      <div key={props.index} className="flex gap-2 p-2">
        <img src={NFTIcon} alt="" className=" rounded-full" />
        <div className="">
          Hello worlds
        </div>
      </div>
    </Box>
  )
}