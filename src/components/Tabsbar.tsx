import React, { useState } from "react";

function Tabsbar({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const [activeTab, setActiveTab] = useState("Recents");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div style={containerStyle}>
      {["Recents", "Relevant"].map((tab) => (
        <div
          key={tab}
          style={tabContainerStyle}
          onClick={() => handleTabClick(tab)}
        >
          <div
            style={{
              ...tabStyle,
              ...(activeTab === tab ? activeTabStyle : {}),
            }}
          >
            {tab}
          </div>
          <div
            style={{
              ...underlineStyle,
              backgroundColor: activeTab === tab ? "#000" : "#ccc",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default Tabsbar;


const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "left",
    marginBottom: "8px",
    marginTop: "12px",
    gap: "8px",
};

const tabContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
};

const tabStyle: React.CSSProperties = {
    padding: "0 8px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#888",
};

const activeTabStyle: React.CSSProperties = {
    color: "#000",
};

const underlineStyle: React.CSSProperties = {
    width: "100%",
    height: "2px",
    marginTop: "4px",
    transition: "background-color 0.3s",
};
