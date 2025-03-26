import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

type MoveLeftTitleProps = {
  title: string;
};

function MoveLeftTitle({ title }: MoveLeftTitleProps) {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <style>{responsiveCSS}</style>
      <button onClick={() => navigate(-1)} className="back-button">
        <IoIosArrowBack/>
      </button>
      <div className="title">{title}</div>
    </div>
  );
}

export default MoveLeftTitle;

const containerStyle: React.CSSProperties = {
    position: "sticky", // 또는 fixed
    top: 0,
    zIndex: 100,
    backgroundColor: "#fff",
    height: "50px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };
  

const responsiveCSS = `
  .back-button {
    position: absolute;
    left: 16px;
    background: none;
    border: none;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
  }

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    .title {
      font-size: 16px;
    }
    .back-button {
      font-size: 18px;
      left: 12px;
    }
  }

  @media (min-width: 768px) {
    .title {
      font-size: 20px;
    }
    .back-button {
      font-size: 22px;
      left: 20px;
    }
  }
`;
