import React from "react";
import { commentCard } from "../../types/CommentTypes";
import { SlOptionsVertical } from "react-icons/sl";

function CommentCard({
  profileImage,
  nickname,
  content,
  isMine,
  commentId,
  onClick,
}: commentCard) {
  return (
    <div style={containerStyle}>
      <div style={imageContainerStyle}>
        <img src={profileImage} alt={nickname} style={imageStyle} />
      </div>
      <div style={textContainerStyle}>
        <div style={textStyle}>{nickname}</div>
        <div style={contentStyle}>{content}</div>
      </div>

      {isMine && (
        <div style={optionsContainerStyle}>
          <button onClick={() => onClick?.(commentId)} style={iconButtonStyle}>
            <SlOptionsVertical />
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentCard;

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 0 0 0",
};

const imageContainerStyle: React.CSSProperties = {
  flexShrink: 0,
  width: "42px",
  height: "42px",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "50%",
};

const textContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const textStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "bold",
};

const contentStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#555",
};

const optionsContainerStyle: React.CSSProperties = {
  marginLeft: "auto",
  position: "relative",
};

const iconButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
};
