import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Chat.tsx";
import Profile from "./components/Profile.tsx";
import { RecoilRoot } from "recoil";
import { SolanaWalletProvider } from "./components/WalletProvider.tsx";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import PumpDetails from "./PumpDetails.tsx";

// import ErrorPage from "./components/Error.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <QueryClientProvider client={new QueryClient}>
      <SolanaWalletProvider>
        <React.StrictMode>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/terminal" element={<PumpDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
      </SolanaWalletProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
