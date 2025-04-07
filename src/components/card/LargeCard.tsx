import React from "react";
import { CardProps } from "../../types/CardProps";

function LargeCard({ imageUrl, title, id, onClick }: CardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={imageStyleWrapper}>
        <img src={imageUrl} alt={title} style={imageStyle} />
      </div>
      <div style={textStyle}>{title}</div>
    </div>
  );
}

export default LargeCard;

const containerStyle: React.CSSProperties = {
  width: "280px",
  display: "flex",
  flexDirection: "column",
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
