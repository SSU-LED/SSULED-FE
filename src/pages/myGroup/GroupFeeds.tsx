import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardProps } from "../../types/CardProps";
import MoveLeftTitle from "../../components/MoveLeftTitle";
import SmallCard from "../../components/SmallCard";
import rawData from "../../assets/tempData.json";
import Tabsbar from "../../components/Tabsbar";
import GroupTabsbar from "../../components/GroupTabsbar";

function GroupFeeds() {
  const tempData: CardProps[] = rawData;
  const navigate = useNavigate();

  const [isJoined, setIsJoined] = useState(true); // 초기값: 가입된 상태

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  const handleButtonClick = () => {
    if (isJoined) {
      // 탈퇴 처리 로직 (예: API 호출 등)
      setIsJoined(false);
      alert("그룹에서 탈퇴했습니다.");
    } else {
      // 등록 처리 로직
      setIsJoined(true);
      alert("그룹에 등록했습니다.");
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
      <MoveLeftTitle title="My Group" page="/group" />
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
      <button style={buttonStyle} onClick={handleButtonClick}>
        {isJoined ? "탈퇴하기" : "등록하기"}
      </button>
    </div>
  );
}

export default GroupFeeds;

const pageStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100vw",
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
}