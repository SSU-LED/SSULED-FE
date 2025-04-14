import React from "react";
import MediumTitle from "../components/title/MediumTitle";
import Top3Ranking from "../components/Top3Ranking";
import rawData from "../assets/tempData.json";
import { CardProps } from "../types/CardProps";
import MoveRightTitle from "../components/title/MoveRightTitle";
import PeriodTabsbar from "../components/PeriodTabsbar";
import SmallImageCard from "../components/card/SmallImageCard";

const tempData: CardProps[] = rawData.map((item) => ({
  ...item,
}));

const rankingData: CardProps[] = rawData.slice(0, 3).map((item, index) => ({
  ...item,
  rank: index + 1, // 순위 부여 (1, 2, 3)
}));

function Group() {
  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>

      <div className="header-wrapper">
        <MediumTitle>Group</MediumTitle>
        <MoveRightTitle title="내 그룹" subtitle="" to="/groupfeeds" />
      </div>

      <PeriodTabsbar />

      <div className="scrollable-content">
        <div>
          <Top3Ranking data={rankingData} />
        </div>

        <div className="small-card-list">
          {tempData.map((item, index) => (
            <SmallImageCard
              key={index}
              image={item.imageUrl}
              title={item.title}
              content={item.content || ""}
            />
          ))}
        </div>
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

`;
