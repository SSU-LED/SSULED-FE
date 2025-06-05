import React from "react";

const tabs = [
  { label: "Feeds" },
  { label: "Statistics" },
  { label: "People" },
];

interface GroupTabsbarProps {
  onTabChange?: (label: string) => void;
  activeLabel?: string;
}

function GroupTabsbar({ onTabChange, activeLabel }: GroupTabsbarProps) {
  return (
    <div style={outerContainerStyle}>
      {tabs.map(({ label }) => {
        const isActive = activeLabel === label;
        const combinedStyle: React.CSSProperties = {
          ...buttonStyle,
          ...(isActive ? activeButtonStyle : {}),
        };

        return (
          <button
            key={label}
            style={combinedStyle}
            onClick={() => onTabChange?.(label)}
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
    backgroundColor: "#e5e5e5",
    display: "inline-flex",
    borderRadius: "16px",
    padding: "4px",
    marginTop: "4px",
    marginBottom: "4px",
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
  }
