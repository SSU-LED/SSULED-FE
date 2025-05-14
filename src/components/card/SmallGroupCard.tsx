import { GCardProps } from "../../types/GCardProps";



function SmallGroupCard({ title, id, onClick }: GCardProps) {
  const handleClick = () => {
    if (onClick) {
        onClick(id);
    }
  };  
  
  return (
        <div style={containerStyle} onClick={handleClick}>
          <div style={textContainerStyle}>
            <div style={textStyle}>{title}</div>
          </div>
        </div>
      );
    }
    
    export default SmallGroupCard;
    
    const containerStyle: React.CSSProperties = {
      display: "flex",
      alignItems: "left",
      marginBottom: "8px",
      gap: "8px",
      padding: "8px 0",
    };
    
    const textContainerStyle: React.CSSProperties = {
      alignItems: "left",
      alignContent: "center",
    };
    
    const textStyle = {
      fontSize: "16px",
      fontWeight: "bold",
    };