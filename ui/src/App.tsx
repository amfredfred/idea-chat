import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Chat from "./Chat";
import Profile from "./components/Profile";
import HomeScreen from "./screens/HomeScreen";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

function ProtectedRoute() {
  const wallet = useWallet();
  const location = useLocation();
  if (!wallet.connected) return <Navigate to="/" state={{ from: location }} replace />;
  return <Outlet />;
}

const App: React.FC = () => {
 
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <WalletModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/chat" element={<Chat />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="*" element={<HomeScreen />} />
            </Routes>
          </BrowserRouter>
        </WalletModalProvider>
    </ThemeProvider>
  );
};

export default App;