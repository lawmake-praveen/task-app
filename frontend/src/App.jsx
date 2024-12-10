import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import Home from "./pages/home/home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notesList" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
