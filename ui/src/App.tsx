import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Chat.tsx";
import Profile from "./components/Profile.tsx";
import HomeScreen from "./screens/HomeScreen/index.tsx";
import MasterLayout from "./layouts/MasterLayout/inedex.tsx";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const App: React.FC = () => {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MasterLayout>
        <BrowserRouter>
          <Routes>
            if(localStorage.getItem("walletAddress"))
            {<Route path="/" element={<HomeScreen />} />}
            {<Route path="/chat" element={<Chat />} />}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </MasterLayout>
    </ThemeProvider>
  );
};

export default App;
