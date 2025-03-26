import { Link } from "react-router-dom";

type MoveRightTitleProps = {
  title: string;
  subtitle: string;
  to?: string; // 동적 링크 추가 (기본값 설정 가능)
};

// title, subtitle, 이동할 곳 입력해주면 자동으로 돌아감
function MoveRightTitle({ title, subtitle, to = "#" }: MoveRightTitleProps) {
  return (
    <div style={containerStyle}>
      <div style={titleStyle}>{title}</div>
      <div>
        <Link to={to} className="block py-2 text-center text-gray-500">
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

