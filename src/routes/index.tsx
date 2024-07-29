import App from "../App.tsx";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Chat from "../Chat.tsx";
import Profile from "../components/Profile.tsx";
import PumpDetails from "../PumpDetails.tsx";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import Loading from "../components/Loading.tsx";

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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<Chat />} />
          <Route path="/terminal" element={<PumpDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}