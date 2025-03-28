import React from "react";
import { CardProps } from "../types/CardProps";

function SmallCard({ imageUrl, title, id, onClick }: CardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={imageWrapperStyle}>
        <img src={imageUrl} alt={title} style={imageStyle} />
        <div style={titleOverlayStyle}>{title}</div>
      </div>
    </div>
  );
}

export default SmallCard;

const containerStyle: React.CSSProperties = {
  width: "180px",
  height: "180px",
  cursor: 'pointer',
};

const imageWrapperStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "12px",
};

const titleOverlayStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center",
  padding: "4px",
  borderRadius: "0 0 12px 12px",
};
