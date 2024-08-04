import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import Loading from "./components/Loading.tsx";
import Chat from "./pages/Chat.tsx";
import { useAppDispatch, useAppSelector } from "./libs/redux/hooks.ts";
import { connectSocket, emitEvent } from "./libs/redux/slices/pump-socket-slice.ts";
import TokenswapStack from "./components/token-swap/TokenSwapStack.tsx";
import { ToastContainer } from "react-toastify";
import { Stack } from "@mui/material";
import Landing from "./pages/Landing.tsx";
import Profile from "./pages/Profile.tsx";
import filtersSvg from "./assets/failters-bg.svg";

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

export default function App() {
  const connected = useAppSelector(state => state.pumpSocket.connected)
  const searchParams = useAppSelector(state => state.pumpSocket.searchParams)
  const socketState = useAppSelector(state => state.pumpSocket.socketState)
  const theme = useAppSelector(state => state.theme.current.styles)
  const chatState = useAppSelector(state => state.chat.state)

  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      dispatch(connectSocket(API_URL))
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(emitEvent('requestPumpList', searchParams))
  }, [connected, searchParams, dispatch])

  if (socketState !== 'receiving') {
    return <Loading />
  }

  return (
    <Stack
      // className="transition-colors duration-1000"
      direction="column" overflow='hidden' position='relative'
      style={{
        width: '100vw', height: '100vh', flexWrap: 'wrap',
        background: chatState === 'PUMP.RAY' ? `url(${filtersSvg})` : theme.bgColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <TokenswapStack />
      <ToastContainer />
    </Stack>
  )
}