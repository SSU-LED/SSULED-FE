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
import { AuthProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import Records from "./pages/records/Records";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import RecordDetail from "./pages/records/RecordDetail";
import RecordEdit from "./pages/records/RecordEdit";
import Profile from "./pages/Profile";
import ChangeNickname from "./pages/ChangeNickname";
import Group from "./pages/Group";
import PeopleInfo from "./pages/myGroup/PeopleInfo";
import CreateGroup from "./pages/group/CreateGroup";
import EditGroup from "./pages/group/EditGroup";
import Verify from "./pages/Verify";
import Stat from "./pages/Stat";
import NewGroup from "./pages/myGroup/newGroup";
import { LoginCallback } from "./pages/auth/LoginCallback";
import MyGroupInfo from "./pages/myGroup/MyGroupInfo";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading app...</div>;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login/callback" element={<LoginCallback />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stat"
          element={
            <ProtectedRoute>
              <Stat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify"
          element={
            <ProtectedRoute>
              <Verify />
            </ProtectedRoute>
          }
        />
        <Route
          path="/group"
          element={
            <ProtectedRoute>
              <Group />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <Records />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records/:id"
          element={
            <ProtectedRoute>
              <RecordDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/records/:id/edit"
          element={
            <ProtectedRoute>
              <RecordEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/changenickname"
          element={
            <ProtectedRoute>
              <ChangeNickname />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newgroup/:id"
          element={
            <ProtectedRoute>
              <NewGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mygroup"
          element={
            <ProtectedRoute>
              <MyGroupInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/peopleinfo/:nickname"
          element={
            <ProtectedRoute>
              <PeopleInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-group"
          element={
            <ProtectedRoute>
              <CreateGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-group"
          element={
            <ProtectedRoute>
              <EditGroup />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>

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

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading protected page...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
