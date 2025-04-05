import { CardProps } from "../../types/CardProps";

function SmallCard({ imageUrl, title, id, content, onClick }: CardProps) {
    const handleClick = () => {
        if (onClick) {
            onClick(id);
        }
    };

    return (
        <div style={containerStyle} onClick={handleClick}>
            <div style={imageContainerStyle}>
                <img src={imageUrl} alt={title} style={imageStyle} />
            </div>
            <div style={textContainerStyle}>
                <div style={textStyle}>{title}</div>
                <div style={contentStyle}>{content}</div>
            </div>
        </div>
    );
}

export default SmallCard;

const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "left",
    marginBottom: "8px",
    gap: "8px",
    padding: "8px 0",
}

const imageContainerStyle: React.CSSProperties = {
    position: "relative",
    flexShrink: 0,
    width: "56px",
    height: "56px",
}

const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "16px",
}

const textContainerStyle: React.CSSProperties = {
    alignItems: "left",
    alignContent: "center",
}

const textStyle = {
    fontSize: "16px",
    fontWeight: "bold",
}

const contentStyle = {
    fontSize: "14px",
    color: "#555",
}