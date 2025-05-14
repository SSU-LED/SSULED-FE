import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MediumTitle from "../components/title/MediumTitle";
import LargeCard from "../components/card/LargeCard";
import MoveRightTitle from "../components/title/MoveRightTitle";
import Tabsbar from "../components/Tabsbar";
import SmallCard from "../components/card/SmallCard";
import { CardProps } from "../types/CardProps.ts";
import { fetchAllRecords, fetchPopularRecords } from "../api/apiRecords";

function Home() {
  const navigate = useNavigate();
  const [records, setRecords] = React.useState<CardProps[]>([]);
  const [popularRecords, setPopularRecords] = React.useState<CardProps[]>([]);
  const [loadingRecords, setLoadingRecords] = React.useState(true);
  const [loadingPopular, setLoadingPopular] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const loading = loadingRecords || loadingPopular;

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetchAllRecords(1, 24);
        const data = response?.data ?? [];  // response or response.data가 null이면 []
        setRecords(data);
        console.log("Fetched records:", data);
      } catch (error) {
        console.error("Error fetching records:", error);
        setRecords([]);
        setError("Failed to fetch records. Please try again later.");
      } finally {
        setLoadingRecords(false);
      }
    };

    const fetchPopular = async () => {
      try {
        const response = await fetchPopularRecords(1, 24);
        const data = response?.data ?? [];
        setPopularRecords(data);
        console.log("Fetched popular records:", data);
      } catch (error) {
        console.error("Error fetching popular records:", error);
        setPopularRecords([]);
        setError("Failed to fetch popular records. Please try again later.");
      } finally {
        setLoadingPopular(false);
      }
    };

    fetchRecords();
    fetchPopular();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("error", error);
  }


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
            {records?.map((item, index) => (
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
          {popularRecords.map((item, index) => (
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
    display: none;
  }

  .image-scroll-container {
    overflow-x: auto;
    padding: 12px 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
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
