import { Link } from "react-router-dom";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoChevronForward } from "react-icons/io5";

type MoveRightTitleProps = {
  title: string;
  subtitle: string;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

function MoveRightTitle({ title, subtitle, to = "#", onClick }: MoveRightTitleProps) {
  const icon = getIconForTitle(title);

  return (
    <div style={containerStyle}>
      <div style={titleWithIconStyle}>
        {icon && <span style={{ marginRight: "8px"}}>{icon}</span>}
        <span>{title}</span>
      </div>
      <Link 
        to={to} 
        onClick={(e) => {
          if (onClick) onClick(e);
        }}
        style={linkStyle}
      >
        {subtitle}
        <IoChevronForward size={16} style={{ marginLeft: "4px", verticalAlign: "middle"}} />
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
  fontSize: "16px",
  fontWeight: 500,
};

const linkStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#a0a0b0",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
};
