import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Chat.tsx";
import Profile from "./components/Profile.tsx";
import { RecoilRoot } from "recoil";
import { SolanaWalletProvider } from "./components/WalletProvider.tsx";
// import ErrorPage from "./components/Error.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <SolanaWalletProvider>
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            if(localStorage.getItem("walletAddress"))
            {<Route path="/chat" element={<Chat />} />}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    </SolanaWalletProvider>
  </RecoilRoot>
);
