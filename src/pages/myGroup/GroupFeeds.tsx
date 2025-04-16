import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardProps } from "../../types/CardProps";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import SmallCard from "../../components/card/SmallCard";
import rawData from "../../assets/tempData.json";
import Tabsbar from "../../components/Tabsbar";
import GroupTabsbar from "../../components/GroupTabsbar";
import { Settings } from "lucide-react";

function GroupFeeds() {
  const tempData: CardProps[] = rawData;
  const navigate = useNavigate();

  const [_isJoined, setIsJoined] = useState(true); // 초기값: 가입된 상태

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  const handleButtonClick = () => {
    const confirmLeave = window.confirm("정말 탈퇴하시겠습니까? 🥺");
      if (confirmLeave) {
        // 탈퇴 처리 로직 (예: API 호출 등)
        setIsJoined(false);
        alert("그룹에서 탈퇴했습니다.");
        navigate("/newgroup/{$id}")
      }
  };

  return (
    <div style={pageStyle}>
      <style>
        {`
          .no-scrollbar {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE */
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari */
          }
        `}
      </style>
      <div style={headerWrapperStyle}>
        <MoveLeftTitle title="My Group" page="/group" />
        <button style={iconButtonStyle} onClick={() => navigate("/edit-group")}>
          <Settings size={20} color="#555" />
        </button>
      </div>

      <div style={barStyle}>
        <GroupTabsbar />
        <Tabsbar />
      </div>
      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div style={listStyle}>
          {tempData.map((item, index) => (
            <SmallCard
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              id={item.id}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <button style={buttonStyle} onClick={handleButtonClick}>탈퇴하기</button>
    </div>
  );
}

export default GroupFeeds;

const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
};

const scrollAreaStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  padding: "16px",
};

const barStyle: React.CSSProperties = {
  padding: "0 16px 16px 16px",
};

const listStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
  gap: "16px",
  placeItems: "center",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  border: "none",
  fontSize: "16px",
  fontWeight: 500,
  backgroundColor: "#FFB6C1",
  color: "black",
  cursor: "pointer",
  borderRadius: "12px",
};

const headerWrapperStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 16px",
  marginBottom: "8px",
};

const iconButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: "8px",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s",
};