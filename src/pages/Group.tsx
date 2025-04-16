import React, { useState } from "react";
import MediumTitle from "../components/title/MediumTitle";
import Top3Ranking from "../components/Top3Ranking";
import rawData from "../assets/tempData.json";
import { CardProps } from "../types/CardProps";
import MoveRightTitle from "../components/title/MoveRightTitle";
import PeriodTabsbar from "../components/PeriodTabsbar";
import SmallGroupCard from "../components/card/SmallGroupCard";
import { useNavigate } from "react-router-dom";

const tempData: CardProps[] = rawData.map((item) => ({
  ...item,
}));

const rankingData: CardProps[] = rawData.slice(0, 3).map((item, index) => ({
  ...item,
  rank: index + 1, // 순위 부여 (1, 2, 3)
}));

function Group() {
  const navigate = useNavigate();
  const [isJoined] = useState(true);
  
  const handleCardClick = (id: number) => {
    navigate(`/newGroup/${id}`);
  };

  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>

      <div className="header-wrapper">
        <MediumTitle>Group</MediumTitle>
        <MoveRightTitle
          title="내 그룹"
          subtitle=""
          to="/groupfeeds"
          onClick={(e) => {
            if (!isJoined) {
              e.preventDefault(); // 링크 이동 막기
              alert("가입한 그룹이 없습니다 🥲");
            }
          }}
        />


      </div>

      <PeriodTabsbar />

      <div className="scrollable-content">
        <div>
          <Top3Ranking data={rankingData} />
        </div>

        <div className="small-card-list">
          {tempData.map((item, index) => (
            <SmallGroupCard
              key={index}
              id={item.id}
              imageUrl={item.imageUrl}
              title={item.title}
              content={item.content || ""}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <div className = "buttonPosition">
        <button className = "floatingButtonStyle" onClick={() => navigate("/create-group")}>
          +
        </button>
      </div>
    </div>
  );
}

export default Group;

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  width: "100%",
  height: "100vh",
};

const responsiveCSS = `
  .header-wrapper {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    padding: 16px 16px 8px 16px;
    border-bottom: 1px solid #eee;
  }
  
  .scrollable-content {
    flex: 1;
    overflow-y: auto;
    padding: 0 16px 16px 16px;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .scrollable-content::-webkit-scrollbar {
    display: none;                  /* Chrome, Safari */
  }
  
  .image-scroll-container {
    overflow-x: auto;
    padding: 12px 0;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }
  .image-scroll-container::-webkit-scrollbar {
    display: none;
  }
  .image-scroll-container::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
  .image-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .image-card-grid {
    display: flex;
    flex-wrap: nowrap;
    gap: 12px;
  }
  .image-card-grid > * {
    flex-shrink: 0;
    min-width: 220px;
  }
  
  .small-card-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
  }

  .buttonPosition {
  position: fixed; 
  bottom: 68px;   
  left: "50%",
  transform: "translateX(-50%)",
  width: 100%;
  z-index: 1000;
  background-color: transparent;
  }

  .floatingButtonStyle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #FFB6C1;
  color: white;
  font-size: 32px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
`;
