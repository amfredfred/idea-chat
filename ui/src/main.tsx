import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RecoilRoot } from "recoil";
import { SolanaWalletProvider } from "./components/WalletProvider.tsx";
// import ErrorPage from "./components/Error.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <SolanaWalletProvider>
      <React.StrictMode>
       <App />
      </React.StrictMode>
    </SolanaWalletProvider>
  </RecoilRoot>
);