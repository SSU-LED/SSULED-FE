import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthStore";

import Home from "./pages/Home";
import Records from "./pages/records/Records";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import RecordDetail from "./pages/records/RecordDetail";
import RecordEdit from "./pages/records/RecordEdit";
import Profile from "./pages/Profile";
import ChangeNickname from "./pages/ChangeNickname";
import Group from "./pages/Group";
import GroupFeeds from "./pages/myGroup/GroupFeeds";
import GroupPeople from "./pages/myGroup/GroupPeople";
import GroupStatistics from "./pages/myGroup/GroupSatistics";
import PeopleInfo from "./pages/myGroup/PeopleInfo";
import CreateGroup from "./pages/group/CreateGroup";
import EditGroup from "./pages/group/EditGroup";
import Verify from "./pages/Verify";
import Stat from "./pages/Stat";
import NewGroup from "./pages/myGroup/newGroup";
import { LoginCallback } from "./pages/auth/LoginCallback";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/stat" element={<Stat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/callback" element={<LoginCallback />} />

          <Route path="/verify" element={<ProtectedRoute><Verify /></ProtectedRoute>} />
          <Route path="/group" element={<ProtectedRoute><Group /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
          <Route path="/records/:id" element={<ProtectedRoute><RecordDetail /></ProtectedRoute>} />
          <Route path="/records/:id/edit" element={<ProtectedRoute><RecordEdit /></ProtectedRoute>} />
          <Route path="/changenickname" element={<ProtectedRoute><ChangeNickname /></ProtectedRoute>} />
          <Route path="/newgroup/:id" element={<ProtectedRoute><NewGroup /></ProtectedRoute>} />
          <Route path="/groupfeeds" element={<ProtectedRoute><GroupFeeds /></ProtectedRoute>} />
          <Route path="/grouppeople" element={<ProtectedRoute><GroupPeople /></ProtectedRoute>} />
          <Route path="/groupstatistics" element={<ProtectedRoute><GroupStatistics /></ProtectedRoute>} />
          <Route path="/peopleinfo/:nickname" element={<ProtectedRoute><PeopleInfo /></ProtectedRoute>} />
          <Route path="/create-group" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />
          <Route path="/edit-group" element={<ProtectedRoute><EditGroup /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/login/callback"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <Outlet />
      {showNavbar && <Navbar />}
    </>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};