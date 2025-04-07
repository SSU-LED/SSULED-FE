import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Records from "./pages/records/Records";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import LoginNaverCallback from "./pages/auth/LoginNaverCallback";
import LoginKakaoCallback from "./pages/auth/LoginKakaoCallback";
import RecordDetail from "./pages/records/RecordDetail";
import RecordEdit from "./pages/records/RecordEdit";
import Profile from "./pages/Profile";
import ChangeNickname from "./pages/ChangeNickname"
import CreateGroup from "./pages/group/CreateGroup";
import EditGroup from "./pages/group/EditGroup";
import Verify from "./pages/Verify";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/stat" element={<h1>Stat</h1>} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/group" element={<h1>Group</h1>} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/login-naver" element={<LoginNaverCallback />}/>
        <Route path="/login-kakao" element={<LoginKakaoCallback />} />
        <Route path="/records" element={<Records />} />
        <Route path="/records/:id" element={<RecordDetail />} />
        <Route path="/records/:id/edit" element={<RecordEdit />} />
        <Route path="/changenickname" element={<ChangeNickname />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/edit-group" element={<EditGroup />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <div style={pageStyle}>
      <Outlet />
      <Navbar />
    </div>
  );
}

export default App;

const pageStyle: React.CSSProperties = {

  backgroundColor: "white",
};
