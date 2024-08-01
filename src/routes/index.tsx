import App from "../App.tsx";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Profile from "../components/Profile.tsx";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import Loading from "../components/Loading.tsx";
import Chat from "../pages/Chat.tsx";
import { useAppDispatch, useAppSelector } from "../libs/redux/hooks.ts";
import { connectSocket, emitEvent } from "../libs/redux/slices/pump-socket-slice.ts";
const API_URL = import.meta.env.VITE_PUMP_SEVER_URL

const connectWallet = async (wallet: any): Promise<boolean> => {
  try {
    if (!wallet.connected) {
      await wallet.connect();
    }
    return wallet.connected;
  } catch {
    return false;
  }
};

const ProtectedRoute: React.FC = () => {
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    connectWallet(wallet).then((connected) => {
      setIsConnected(connected);
      setIsLoading(false);
    });
  }, [wallet]);

  if (!wallet.wallet) return <Navigate to="/" />
  if (isLoading || wallet.connecting || !isConnected) return <Loading />;
  return <Outlet />
};

export default function RoutesPortal() {
  const { connected, searchParams, socketState } = useAppSelector(state => state.pumpSocket)
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(connectSocket(API_URL));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(emitEvent('requestPumpList', searchParams))
  }, [connected, searchParams, dispatch])

  if (socketState !== 'receiving') {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}