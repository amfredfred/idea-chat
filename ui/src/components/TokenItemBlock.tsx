import { Avatar, Box } from "@mui/material"
import NFTIcon from '@src/assets/nft-icon.png'
import FolderIcon from '@mui/icons-material/Folder';

export interface ITokenItemBlock {
  index: number,
  token: number
}


export default function TokenItemBlock(props: ITokenItemBlock) {

  return (
    <Box sx={{ maxWidth: '100%' }} className=' w-full  bg-black  border-b-current  cursor-pointer'>
      <div key={props.index} className="flex gap-2 p-2">
        <Avatar
          alt="Remy Sharp"
          src={NFTIcon}
          sx={{ width: 56, height: 56 }}
        />
        <div className=" flex flex-col">
          <div className="">sdsd</div>
          <div className="">dsddsd</div>
        </div>
      </div>
    </Box>
  )
}