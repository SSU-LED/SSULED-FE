import { Link } from "react-router-dom";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

function MoveRightTitle({ title, subtitle }: { title: string; subtitle: string }) {
  const icon = getIconForTitle(title);

  return (
    <div style={containerStyle}>
      <div style={titleWithIconStyle}>
        {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
        <span>{title}</span>
      </div>
      <Link to="/records" style={linkStyle}>
        {subtitle} {">"}
      </Link>
    </div>
  );
}

export default MoveRightTitle;

function getIconForTitle(title: string): React.ReactNode | null {
  switch (title.toLowerCase()) {
    case "records":
      return <FaRegCalendarCheck size={20} />;
    case "profile":
      return <CgProfile size={20} />;
    default:
      return null;
  }
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "8px",
};

const titleWithIconStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "20px",
  fontWeight: "bold",
};

const linkStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#666",
  textDecoration: "none",
};
