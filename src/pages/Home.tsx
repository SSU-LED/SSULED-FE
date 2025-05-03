import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MediumTitle from "../components/title/MediumTitle";
import LargeCard from "../components/card/LargeCard";
import MoveRightTitle from "../components/title/MoveRightTitle";
import Tabsbar from "../components/Tabsbar";
import SmallCard from "../components/card/SmallCard";
import rawData from "../assets/tempData.json";
import { CardProps } from "../types/CardProps";
import { apiClient } from "../api/apiClient";

const tempData: CardProps[] = rawData.map((item) => ({
  ...item,
}));

function Home() {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await apiClient.get("/user/userinfo");
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>

      <div className="header-wrapper">
        <MediumTitle>Home</MediumTitle>
        <MoveRightTitle
          title="Records"
          subtitle="Show all Records"
          to="/records"
        />
      </div>

      <div className="scrollable-content">
        <div className="image-scroll-container">
          <div className="image-card-grid">
            {tempData.map((item, index) => (
              <LargeCard
                key={index}
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </div>

        <Tabsbar />

        <div className="small-card-list">
          {tempData.map((item, index) => (
            <SmallCard
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
    </div>
  );
}

export default Home;

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
