import { AppProvider } from "./AppContext";
import Login from "./pages/auth/LoginPage.jsx";
import Register from "./pages/auth/Register";
import Chat from "./pages/chat/Chat";
import Home from "./pages/home/TaskListPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/taskList" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
