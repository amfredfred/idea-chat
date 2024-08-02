if (process.env.NODE_ENV !== 'production') {
  console.error = () => { };
  console.warn = () => { };
}

import React from "react";
import ReactDOM from "react-dom/client";

import 'swiper/css';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import { RecoilRoot } from "recoil";
import { SolanaWalletProvider } from "./components/WalletProvider.tsx";
import RoutesPortal from "./routes/index.tsx";
import StoreProvider from "./providers/StoreProvider/index.tsx";

// import ErrorPage from "./components/Error.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <SolanaWalletProvider>
      <React.StrictMode>
        <StoreProvider>
          <RoutesPortal />
        </StoreProvider>
      </React.StrictMode>
    </SolanaWalletProvider>
  </RecoilRoot>
);
