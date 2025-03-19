import { Link } from "react-router-dom";

function MoveRightTitle({title, subtitle}: {title: string, subtitle: string} ) {
  return (
    <div style={containerStyle}>
        <div style={titleStyle}>{title}</div>
        <div>
            <Link to="/records" className="block py-2 text-center text-gray-500">
                {subtitle} {">"}
            </Link>
        </div>
    </div>
  );
}

export default MoveRightTitle;

const containerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
};

const titleStyle: React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
};