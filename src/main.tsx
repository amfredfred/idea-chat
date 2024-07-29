import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RecoilRoot } from "recoil";
import { SolanaWalletProvider } from "./components/WalletProvider.tsx";
import RoutesPortal from "./routes/index.tsx";
import StoreProvider from "./providers/StoreProvider/index.tsx";
import TokenswapStack from "./components/patials/TokenswapStack.tsx";
import { Stack } from "@mui/material";

// import ErrorPage from "./components/Error.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <SolanaWalletProvider>
      <React.StrictMode>
        <StoreProvider>
          <Stack direction="row" overflow='hidden' position='relative'>
            <RoutesPortal />
            <TokenswapStack />
          </Stack>
        </StoreProvider>
      </React.StrictMode>
    </SolanaWalletProvider>
  </RecoilRoot>
);
