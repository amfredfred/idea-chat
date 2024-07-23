import App from "../App.tsx";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Chat from "../Chat.tsx";
import Profile from "../components/Profile.tsx";
import PumpDetails from "../PumpDetails.tsx";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import Loading from "../components/Loading.tsx";

const ProtectedRoute: React.FC = () => {
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (!wallet.connected) {
        try {
          await wallet.connect();
          setIsConnected(wallet.connected);
        } catch (error) {
          setIsConnected(false);
        }
      } else {
        setIsConnected(true);
      }
      setIsLoading(false);
    };

    checkConnection();
  }, [wallet]);

  if (isLoading || !isConnected) {
    return <Loading />;
  }

  return isConnected ? <Outlet /> : <Navigate to="/" />;
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