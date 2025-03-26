import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Records from "./pages/Records";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile"
import ChangeNickname from "./pages/ChangeNickname"

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/records"];

  return (
    <div style={pageStyle}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stat" element={<h1>Stat</h1>} />
        <Route path="/verify" element={<h1>Verify</h1>} />
        <Route path="/group" element={<h1>Group</h1>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/records" element={<Records />} />
        <Route path="/changenickname" element={<ChangeNickname />} />
      </Routes>

      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
    </div>
  );
}

export default App;

const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  maxWidth: "430px",
};
