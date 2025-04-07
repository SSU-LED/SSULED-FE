import React from "react";
import { useNavigate } from "react-router-dom";

const tabs = [
    { label: "Feeds", path: "/groupfeeds" },
    { label: "Statistics", path: "/groupstatistics" },
    { label: "People", path: "/grouppeople" },
  ];

function GroupTabsbar() {
  const navigate = useNavigate();

  return (
    <div style={outerContainerStyle}>
      {tabs.map(({ label, path }, index) => {
        const isActive = location.pathname === path;
        return (
          <button
            key={label}
            style={{
              ...buttonStyle,
              ...(isActive ? activeButtonStyle : {}),
              ...(index === 0 ? firstButtonStyle : {}),
              ...(index === tabs.length - 1 ? lastButtonStyle : {}),
            }}
            onClick={() => navigate(path)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default GroupTabsbar;

const outerContainerStyle: React.CSSProperties = {
    display: "inline-flex",
    backgroundColor: "#e5e5e5",
    borderRadius: "16px",
    padding: "4px",
    marginTop: "16px",
    marginBottom: "20px",
  };
  
  const buttonStyle: React.CSSProperties = {
    padding: "10px 20px",
    border: "none",
    fontSize: "15px",
    fontWeight: 500,
    backgroundColor: "transparent",
    color: "#666",
    cursor: "pointer",
    borderRadius: "12px",
    transition: "all 0.2s ease-in-out",
    whiteSpace: "nowrap",
  };
  
  const activeButtonStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    color: "#000000",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  };
  
  const firstButtonStyle: React.CSSProperties = {
    marginRight: "4px",
  };
  
  const lastButtonStyle: React.CSSProperties = {
    marginLeft: "4px",
  };
  