import React from "react";
import MediumTitle from "../components/MediumTitle";
import MediumCard from "../components/MediumCard";
import MoveRightTitle from "../components/MoveRightTitle";
import Tabsbar from "../components/Tabsbar";
import SmallImageCard from "../components/SmallImageCard";
import rawData from "../assets/tempData.json";
import { CardProps } from "../types/CardProps";

const tempData: CardProps[] = rawData.map((item) => ({
  ...item,
}));

function Home() {
  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>
  
      <div className="header-wrapper">
        <MediumTitle>Home</MediumTitle>
        <MoveRightTitle title="Records" subtitle="Show all Records" to="/records"/>
      </div>
  
      <div className="scrollable-content">
        <div className="image-scroll-container">
          <div className="image-card-grid">
            {tempData.map((item, index) => (
              <MediumCard
                key={index}
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
              />
            ))}
          </div>
        </div>
  
        <Tabsbar />
  
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

export default Home;

const layoutStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    width: "100vw",
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