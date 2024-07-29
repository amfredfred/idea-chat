import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RecoilRoot } from "recoil";
import { SolanaWalletProvider } from "./components/WalletProvider.tsx";
import RoutesPortal from "./routes/index.tsx";

// import ErrorPage from "./components/Error.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
      <SolanaWalletProvider>
        <React.StrictMode>
          <RoutesPortal />
        </React.StrictMode>
      </SolanaWalletProvider>
  </RecoilRoot>
);
