if (process.env.NODE_ENV !== 'production') {
  console.error = () => { };
  console.warn = () => { };
}

import React from "react";
import ReactDOM from "react-dom/client";

import 'swiper/css';
import "./index.css";
import { RecoilRoot } from "recoil";
import { SolanaWalletProvider } from "./components/WalletProvider.tsx";
import RoutesPortal from "./routes/index.tsx";
import StoreProvider from "./providers/StoreProvider/index.tsx";
import TokenswapStack from "./components/token-swap/TokenSwapStack.tsx";
import { Box, Stack } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import ErrorPage from "./components/Error.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <SolanaWalletProvider>
      <React.StrictMode>
        <StoreProvider>
          <Stack direction="row" overflow='hidden' position='relative' style={{ width: '100vw', height: '100vh', flexWrap: 'wrap' }}>
            <Box flexGrow={1}>
              <RoutesPortal />
            </Box>
            <TokenswapStack />
            <ToastContainer />
          </Stack>
        </StoreProvider>
      </React.StrictMode>
    </SolanaWalletProvider>
  </RecoilRoot>
);
