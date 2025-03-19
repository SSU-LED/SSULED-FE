import { Link, useLocation } from "react-router-dom";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Stat", path: "/stat" },
    { name: "Verify", path: "/verify" },
    { name: "Group", path: "/group" },
    { name: "Profile", path: "/profile" },
];

function Navbar() {
    const location = useLocation();

    return (
        <nav style={navbarStyle}>
            <ul style={ulStyle}>
                {navItems.map((item) => (
                    <li key={item.path} style={liStyle}>
                        <Link
                            to={item.path}
                            style={{
                                ...linkStyle,
                                ...(location.pathname === item.path ? activeLinkStyle : {}),
                            }}
                        >
                            {item.name}
                            {location.pathname === item.path && <div style={underlineStyle} />}
                        </Link>
                    </li>
                ))}
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
    maxWidth: "430px",
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

const underlineStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: "50%",
    height: "2px",
    backgroundColor: "#000",
    borderRadius: "2px",
};
