function ImageCard({ imageUrl, title, content, size = "medium" }: ImageCardProps) {
    return (
        <div style={{...containerStyle, ...containerSizeStyles[size]}}>
            <div style={{...imageContainerStyle, ...imageSizeStyles[size]}}>
                <img src={imageUrl} alt={title} style={imageStyle} />
                {size === "small" && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        right: "0",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "4px",
                        borderRadius: "0 0 16px 16px",
                    }}
                >
                    {title}
                </div>
                )}
            </div>
            {(size === "medium" || size === "large") && (
                <div style={textContainerStyle}>
                <div style={textStyle}>{title}</div>
                {size === "large" && content && <p style={contentStyle}>{content}</p>}
                </div>
            )}
        </div>
    );
}

export default ImageCard;

type ImageCardProps = {
    imageUrl: string;
    title: string;
    content?: string;
    size?: "small" | "medium" | "large";
};

const containerSizeStyles = {
    small: { width: "180px", height: "180px" }, // w-20 h-20
    medium: { width: "280px", height: "100%" }, // w-36 h-36
    large: { width: "100vw", height: "240px" }, // w-48 h-48
};

const imageSizeStyles = {
    small: { width: "180px", height: "180px" }, // w-20 h-20
    medium: { width: "264px", height: "188px" }, // w-36 h-36
    large: { width: "100vw", height: "212px" }, // w-48 h-48
};

const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
};

const imageContainerStyle: React.CSSProperties = {
    position: "relative",
    flexShrink: 0,
};

const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
};

const textContainerStyle: React.CSSProperties = {
    textAlign: "left",
    width: "100%",
    fontWeight: "bolder",
};

const textStyle: React.CSSProperties = {
    fontSize: "16px",
    margin: "8px 0",
};

const contentStyle: React.CSSProperties = {
    fontSize: "14px",
    color: "#555",
};