import React from "react";
import { CardProps } from "../../types/CardProps";
import { FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

function LargeCard({
  imageUrl,
  title,
  id,
  likeCount,
  commentCount,
  onClick,
}: CardProps) {
  const isPlaceholder = id === -1;

  const handleClick = () => {
    if (!isPlaceholder && onClick) {
      onClick(id);
    }
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={imageStyleWrapper}>
        {isPlaceholder ? (
          <div style={placeholderBoxStyle}>
            <span style={placeholderTextStyle}>기록 없음</span>
          </div>
        ) : (
          <>
            <img src={imageUrl} alt={title} style={imageStyle} />
            {(likeCount !== undefined || commentCount !== undefined) && (
              <div style={statsOverlayStyle}>
                <span style={statItemStyle}>
                  <FaHeart /> {likeCount || 0}
                </span>
                <span style={statItemStyle}>
                  <IoChatboxEllipsesOutline /> {commentCount || 0}
                </span>
              </div>
            )}
          </>
        )}
      </div>
      <div style={{ ...textStyle, opacity: isPlaceholder ? 0.5 : 1 }}>
        {title}
      </div>
    </div>
  );
}

export default LargeCard;

const containerStyle: React.CSSProperties = {
  width: "12rem",
  height: "12rem",
  display: "flex",
  flexDirection: "column",
};

const imageStyleWrapper: React.CSSProperties = {
  width: "100%",
  height: "188px",
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative",
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

const statsOverlayStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 8,
  right: 8,
  display: "flex",
  gap: "8px",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  borderRadius: "12px",
  padding: "4px 8px",
};

const statItemStyle: React.CSSProperties = {
  color: "white",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "3px",
};

const placeholderBoxStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "#ccc",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const placeholderTextStyle: React.CSSProperties = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "bold",
};
