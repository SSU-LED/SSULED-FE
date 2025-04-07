import React from "react";
import RankingCard from "./RankingCard";
import { CardProps } from "../types/CardProps";

interface Top3RankingProps {
  data: CardProps[]; // 상위 3개만 전달받음
}

const Top3Ranking: React.FC<Top3RankingProps> = ({ data }) => {
  return (
    <div style={wrapperStyle}>
      <div style={PlaceStyle}>
        <RankingCard {...data[0]} rank={1} />
      </div>
      <div style={bottomRowStyle}>
        <div style={PlaceStyle}>
          <RankingCard {...data[1]} rank={2}/>
        </div>
        <div style={PlaceStyle}>
          <RankingCard {...data[2]} rank={3}/>
        </div>
      </div>
    </div>
  );
};

export default Top3Ranking;

const wrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  
  const bottomRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap", // 줄 바꿈 허용
    justifyContent: "center", // 가운데 정렬
  };
  
  const PlaceStyle: React.CSSProperties = {
    transform: "scale(0.95)",
  };
  