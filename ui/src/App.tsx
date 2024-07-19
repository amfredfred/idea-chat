import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Chat.tsx";
import Profile from "./components/Profile.tsx";
import HomeScreen from "./screens/HomeScreen/index.tsx";
import MasterLayout from "./layouts/MasterLayout/inedex.tsx";

const App: React.FC = () => {
  return (
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
  );
};

export default App;
