import { GCardProps } from "../../types/GCardProps";
import { FaUsers, FaLock, FaLockOpen } from "react-icons/fa";

function SmallGroupCard({
  title,
  id,
  isAccessible,
  memberCount,
  maxMember,
  onClick,
}: GCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div style={containerStyle} onClick={handleClick}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={textStyle}>{title}</div>
          {isAccessible !== undefined && (
            <div style={accessIconStyle}>
              {isAccessible ? (
                <FaLockOpen color="#4CAF50" />
              ) : (
                <FaLock color="#FF9800" />
              )}
            </div>
          )}
        </div>

        {memberCount !== undefined && maxMember !== undefined && (
          <div style={memberInfoStyle}>
            <FaUsers style={{ marginRight: "6px" }} />
            <span>
              {memberCount}/{maxMember} 멤버
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SmallGroupCard;

const containerStyle: React.CSSProperties = {
  marginBottom: "12px",
  cursor: "pointer",
};

const cardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "8px 16px",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  border: "1px solid #f0f0f0",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const textStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333",
};

const accessIconStyle: React.CSSProperties = {
  fontSize: "16px",
};

const memberInfoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
  color: "#666",
};
