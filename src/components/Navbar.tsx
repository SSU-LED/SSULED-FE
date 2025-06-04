import { Link, useLocation } from "react-router-dom";
import {
  MdHome,
  MdBarChart,
  MdOutlineAddAPhoto,
  MdGroups,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const navItems = [
  { name: "Home", path: "/", icon: MdHome },
  { name: "Stat", path: "/stat", icon: MdBarChart },
  { name: "Verify", path: "/verify", icon: MdOutlineAddAPhoto },
  { name: "Group", path: "/group", icon: MdGroups },
  { name: "Profile", path: "/profile", icon: CgProfile },
];

function Navbar() {
  const location = useLocation();

  return (
    <nav style={navbarStyle}>
      <ul style={ulStyle}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <li key={item.path} style={liStyle}>
              <Link
                to={item.path}
                style={{
                  ...linkStyle,
                  ...(isActive ? activeLinkStyle : {}),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Icon size={20} color={isActive ? "#000" : "#888"} />
                  <span>{item.name}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;

const navbarStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: "50%",
  display: "flex",
  justifyContent: "center",
  width: "420px",
  transform: "translateX(-50%)",
  zIndex: 10,
  backgroundColor: "#fff",
  background: "linear-gradient(to top, rgba(255,255,255,1) 75%, rgba(255,255,255,0) 100%)",
  height: "3rem",
  alignItems: "center",
  padding: "2rem 0",
};

const ulStyle: React.CSSProperties = {
  display: "flex",
  width: "100%",
  listStyle: "none",
  padding: 0,
};

const liStyle: React.CSSProperties = {
  flex: 1,
  textAlign: "center",
};

const linkStyle: React.CSSProperties = {
  display: "block",
  padding: "8px 0",
  fontSize: "12px",
  fontWeight: "seni-bold",
  color: "#888",
  textDecoration: "none",
  position: "relative",
};

const activeLinkStyle: React.CSSProperties = {
  color: "#000",
};
