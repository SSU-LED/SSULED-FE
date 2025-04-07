import React from "react";
import { CardProps } from "../types/CardProps";

interface RankingCardProps extends CardProps {
  rank?: number; // 등수는 선택적으로 받을 수 있음
}

function RankingCard({ imageUrl, title, rank }: RankingCardProps) {
  const renderRank = () => {
    if (rank === 1) return "👑 1등";
    if (rank === 2) return "🥈 2등";
    if (rank === 3) return "🥉 3등";
    return null;
  };
  
  return (
    <div style={containerStyle}>
      <div style={imageStyleWrapper}>
        <img src={imageUrl} alt={title} style={imageStyle} />
      </div>
      <div style={textStyle}>{title}</div>
      {rank && <div style={rankTextStyle}>{renderRank()}</div>}
    </div>
  );
}

export default RankingCard;

const containerStyle: React.CSSProperties = {
  width: "280px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",
  padding: "8px"
};

const imageStyleWrapper: React.CSSProperties = {
  width: "100%",
  height: "188px",
  borderRadius: "12px",
  overflow: "hidden",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const textStyle: React.CSSProperties = {
  marginTop: "8px",
  fontSize: "16px",
  fontWeight: "bold",
};

const rankTextStyle: React.CSSProperties = {
  marginTop: "4px",
  fontSize: "14px",
  color: "#555",
  fontWeight: "500",
};
