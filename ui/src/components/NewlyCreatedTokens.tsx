import { useState } from "react";
import TokenItemBlock, { ITokenItemBlock } from "./TokenItemBlock";
import { Box } from "@mui/material";

export default function NewlyCreatedTokens() {
  const initialTokens: ITokenItemBlock[] = Array.from({ length: 50 }, (_, index) => ({ token: 2, index }));

  const [newlyCreatedTokens,] = useState<ITokenItemBlock[]>(initialTokens); //setNewlyCreatedTokens

  return (
    <Box
      className=' w-80 flex flex-col  flex-grow bg-black  rounded-2xl p-2'
      sx={{ overflow: 'hidden', width: 400,  height: '85vh' }}>
      
      {newlyCreatedTokens.map(TokenItemBlock)}
    </Box>
  )
}