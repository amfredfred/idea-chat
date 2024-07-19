import { useState } from "react";
import TokenItemBlock, { ITokenItemBlock } from "./TokenItemBlock";

export default function NewlyCreatedTokens() {
  const initialTokens: ITokenItemBlock[] = Array.from({ length: 20 }, (_, index) => ({ token: 2, index }));

  const [newlyCreatedTokens,] = useState<ITokenItemBlock[]>(initialTokens); //setNewlyCreatedTokens

  return (
    <div>
      {newlyCreatedTokens.map(TokenItemBlock)}
    </div>
  )
}
