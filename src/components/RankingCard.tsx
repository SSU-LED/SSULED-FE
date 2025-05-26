import React from "react";
import { CardProps } from "../types/CardProps";

interface RankingCardProps extends CardProps {
  rank?: number;
}

function RankingCard({ title, rank }: RankingCardProps) {
  const renderRank = () => {
    if (rank === 1) return "👑 1등";
    if (rank === 2) return "🥈 2등";
    if (rank === 3) return "🥉 3등";
    return null;
  };

  return (
    <div style={containerStyle}>
      <div style={rankTextStyle}>{renderRank()}</div>
      <div style={textStyle}>{title}</div>
    </div>
  );
}

export default RankingCard;

const containerStyle: React.CSSProperties = {
  width: "160px",
  height: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  backgroundColor: "#f4f4f4",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  padding: "12px",
};

const textStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "bold",
  marginTop: "8px",
};

const rankTextStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  color: "#444",
};
