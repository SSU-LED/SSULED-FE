import React from "react";
import { CardProps } from "../types/CardProps";

function LargeCard({ imageUrl, title, content }: CardProps) {
  return (
    <div style={containerStyle}>
      <div style={imageStyleWrapper}>
        <img src={imageUrl} alt={title} style={imageStyle} />
      </div>
      <div style={textContainerStyle}>
        <div style={titleStyle}>{title}</div>
        {content && <p style={contentStyle}>{content}</p>}
      </div>
    </div>
  );
}

export default LargeCard;

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "800px",
  display: "flex",
  flexDirection: "column",
};

const imageStyleWrapper: React.CSSProperties = {
  width: "100%",
  height: "212px",
  borderRadius: "12px",
  overflow: "hidden",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const textContainerStyle: React.CSSProperties = {
  marginTop: "8px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
};

const contentStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#555",
};
