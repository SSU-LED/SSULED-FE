import React from "react";
import { CardProps } from "../../types/CardProps";
import { FaHeart } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

function MediumCard({
  imageUrl,
  title,
  id,
  likeCount,
  commentCount,
  onClick,
}: CardProps) {
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
      </div>
    </div>
  );
}

export default MediumCard;

const containerStyle: React.CSSProperties = {
  width: "180px",
  height: "180px",
  cursor: "pointer",
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

const statsOverlayStyle: React.CSSProperties = {
  position: "absolute",
  top: 8,
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
