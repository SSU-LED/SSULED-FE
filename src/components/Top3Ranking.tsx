import React from "react";
import RankingCard from "./RankingCard";
import { CardProps } from "../types/CardProps";

interface Top3RankingProps {
  data: CardProps[]; // 상위 3개만 전달받음
}

const Top3Ranking: React.FC<Top3RankingProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div style={noDataStyle}>
        <p>아직 랭킹 정보가 없습니다.</p>
        <p>그룹 활동을 통해 랭킹에 도전해보세요!</p>
      </div>
    );
  }

  return (
    <div style={wrapperStyle}>
      <div style={PlaceStyle}>
        {data[0] ? (
          <RankingCard {...data[0]} rank={1} />
        ) : (
          <EmptyRankingCard rank={1} />
        )}
      </div>
      <div style={bottomRowStyle}>
        <div style={PlaceStyle}>
          {data[1] ? (
            <RankingCard {...data[1]} rank={2} />
          ) : (
            <EmptyRankingCard rank={2} />
          )}
        </div>
        <div style={PlaceStyle}>
          {data[2] ? (
            <RankingCard {...data[2]} rank={3} />
          ) : (
            <EmptyRankingCard rank={3} />
          )}
        </div>
      </div>
    </div>
  );
};

// 빈 랭킹 카드 컴포넌트
const EmptyRankingCard = ({ rank }: { rank: number }) => {
  const renderRank = () => {
    if (rank === 1) return "👑 1등";
    if (rank === 2) return "🥈 2등";
    if (rank === 3) return "🥉 3등";
    return null;
  };

  return (
    <div style={{ ...containerStyle, backgroundColor: "#f8f8f8" }}>
      <div style={rankTextStyle}>{renderRank()}</div>
      <div style={emptyTextStyle}>도전해보세요!</div>
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

const rankTextStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  color: "#444",
};

const emptyTextStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#888",
  marginTop: "8px",
};

const noDataStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "30px",
  backgroundColor: "#f8f8f8",
  borderRadius: "12px",
  color: "#666",
};
