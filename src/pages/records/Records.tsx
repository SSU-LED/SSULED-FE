import { useNavigate } from "react-router-dom";
import { CardProps } from "../../types/CardProps";
import MoveLeftTitle from "../../components/MoveLeftTitle";
import SmallCard from "../../components/SmallCard";
import rawData from "../../assets/tempData.json";
import Tabsbar from "../../components/Tabsbar";

function Records() {
  const tempData: CardProps[] = rawData;
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
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
      <MoveLeftTitle title="Records" page="/" />
      <div style={barStyle}>
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
    </div>
  );
}

export default Records;

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
