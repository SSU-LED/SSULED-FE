import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoOptionsOutline } from "react-icons/io5";

type MoveLeftTitleProps = {
  title: string;
  page?: string;
  showOptionButton?: boolean;
  onOptionClick?: () => void;
};

function MoveLeftTitle({
  title,
  page,
  showOptionButton = false,
  onOptionClick,
}: MoveLeftTitleProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (page) {
      navigate(page);
    } else {
      navigate(-1);
    }
  };

  return (
    <div style={containerStyle}>
      <style>{responsiveCSS}</style>

      <button onClick={handleBack} className="back-button">
        <IoIosArrowBack />
      </button>

      <div className="title">{title}</div>

      {showOptionButton && (
        <button
          onClick={onOptionClick}
          className="option-button"
          aria-label="Options"
        >
          <IoOptionsOutline />
        </button>
      )}
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
    color: #333;
    cursor: pointer;
  }

  .option-button {
    position: absolute;
    right: 16px;
    background: none;
    border: none;
    font-size: 20px;
    color: #333;
    cursor: pointer;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }

  @media (max-width: 480px) {
    .title {
      font-size: 16px;
    }
    .back-button, .option-button {
      font-size: 18px;
    }
  }

  @media (min-width: 768px) {
    .title {
      font-size: 20px;
    }
    .back-button, .option-button {
      font-size: 22px;
    }
  }
`;
