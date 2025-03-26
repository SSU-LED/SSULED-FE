import { Link } from "react-router-dom";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

type MoveRightTitleProps = {
  title: string;
  subtitle: string;
  to?: string; // 동적 링크 추가 (기본값 설정 가능)
};

function MoveRightTitle({ title, subtitle, to='#' }: MoveRightTitleProps) {
  const icon = getIconForTitle(title);

  return (
    <div style={containerStyle}>
      <div style={titleWithIconStyle}>
        {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
        <span>{title}</span>
      </div>
      <Link to={to} className="block py-2 text-center text-gray-500">
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
