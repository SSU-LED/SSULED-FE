import { Link, useLocation } from "react-router-dom";
import { MdHome, MdBarChart, MdOutlineAddAPhoto, MdGroups } from "react-icons/md";
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
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
    transform: "translateX(-50%)",
    width: "100%",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
    boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
    height: "56px",
    display: "flex",
    alignItems: "center",
};

const ulStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    padding: "0",
    margin: "0",
    listStyle: "none",
};

const liStyle: React.CSSProperties = {
    flex: 1,
    textAlign: "center",
};

const linkStyle: React.CSSProperties = {
    display: "block",
    padding: "8px 0",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#888",
    textDecoration: "none",
    position: "relative",
};

const activeLinkStyle: React.CSSProperties = {
    color: "#000",
};