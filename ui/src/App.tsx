import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./Chat.tsx";
import Profile from "./components/Profile.tsx";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        if(localStorage.getItem("walletAddress"))
        {<Route path="/chat" element={<Chat />} />}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
