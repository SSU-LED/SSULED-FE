import { useNavigate } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import MediumCard from "../../components/card/MediumCard";
import Tabsbar from "../../components/Tabsbar";
import { fetchAllRecords } from "../../api/apiRecords";
import { useEffect, useState } from "react";
import { RecordData } from "../../types/RecordTypes";

function Records() {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  const [records, setRecords] = useState<RecordData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetchAllRecords(1, 24);
        if (!response || !response.data) {
          throw new Error("No data returned from API");
        }
        setRecords(response.data);
        console.log("Fetched records:", response.data);
      } catch (error) {
        console.error("Error fetching records:", error);
        setRecords([]);
        setError("Failed to fetch records. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log("error", error);
  }

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
      <MoveLeftTitle title="Records" page="/" />
      <div style={barStyle}>
        <Tabsbar />
      </div>
      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div style={listStyle}>
          {records?.map((item, index) => (
            <MediumCard
              key={index}
              imageUrl={item.imageUrl[0]}
              title={item.updatedAt}
              id={item.id}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Records;

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
