import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
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
          <Route path="/verify" element={<Verify />} />
          <Route path="/group" element={<Group />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/callback" element={<LoginCallback />} />
          <Route path="/records" element={<Records />} />
          <Route path="/records/:id" element={<RecordDetail />} />
          <Route path="/records/:id/edit" element={<RecordEdit />} />
          <Route path="/changenickname" element={<ChangeNickname />} />
          <Route path="/newgroup/:id" element={<NewGroup />} />
          <Route path="/groupfeeds" element={<GroupFeeds />} />
          <Route path="/grouppeople" element={<GroupPeople />} />
          <Route path="/groupstatistics" element={<GroupStatistics />} />
          <Route path="/peopleinfo/:id" element={<PeopleInfo />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/edit-group" element={<EditGroup />} />
        </Route>
      </Routes>
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const NavbarRoutes = ["/", "/stat", "/verify", "/group", "/profile"];
  const showNavbar = NavbarRoutes.includes(location.pathname);

  return (
    <div style={pageStyle}>
      <Outlet />
      {showNavbar && <Navbar />}
    </div>
  );
}

export default App;

const pageStyle: React.CSSProperties = {
  backgroundColor: "white",
};
