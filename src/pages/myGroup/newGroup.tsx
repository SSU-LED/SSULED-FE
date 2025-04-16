import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardProps } from "../../types/CardProps";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import SmallCard from "../../components/card/SmallCard";
import rawData from "../../assets/tempData.json";
import Tabsbar from "../../components/Tabsbar";

function newGroup() {
  const tempData: CardProps[] = rawData;
  const navigate = useNavigate();

  const [isJoined, setIsJoined] = useState(false); // 초기값: 가입된 상태
  const [isPublic] = useState(false); // true: 공, false: 비공
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 오류 상태
  const [showPasswordInput, setShowPasswordInput] = useState(false); // 비밀번호 입력 창 표시 여부
  
  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  const handleButtonClick = () => {
    setShowPasswordInput(true); // 버튼 클릭 시 비밀번호 입력 창 표시
  };

  const handlePasswordSubmit = () => {
    if (!isPublic && password !== "ssuled") { // 비공개일 때 비밀번호 체크
      setPasswordError("비밀번호가 틀렸습니다!");
      return;
    }

    alert("그룹에 등록되었습니다!");
    setIsJoined(true); // 버튼을 누르면 가입된 상태로 변경
    navigate("/groupfeeds");
  };

  return (
    <div style={pageStyle}>
      <style>
        {`
          .no-scrollbar {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE */
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari */
          }
        `}
      </style>
      <MoveLeftTitle title="My Group" page="/group" />
      <div style={barStyle}>
        <Tabsbar />
      </div>
      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div style={listStyle}>
          {tempData.map((item, index) => (
            <SmallCard
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              id={item.id}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      {!isJoined && !showPasswordInput && (
        <button style={buttonStyle} onClick={handleButtonClick}>
          등록하기
        </button>
      )}

      {showPasswordInput && (
        <div style={passwordContainerStyle}>
          <h3 style={titleStyle}>그룹 비밀번호 입력</h3>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          {passwordError && <p style={errorStyle}>{passwordError}</p>}
          <button style={submitButtonStyle} onClick={handlePasswordSubmit}>
            확인
          </button>
        </div>
      )}
    </div>
  );
}

export default newGroup;

const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
};

const scrollAreaStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  padding: "16px",
};

const barStyle: React.CSSProperties = {
  padding: "0 16px 16px 16px",
};

const listStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
  gap: "16px",
  placeItems: "center",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 20px",
  border: "none",
  fontSize: "16px",
  fontWeight: 500,
  backgroundColor: "#FFB6C1",
  color: "black",
  cursor: "pointer",
  borderRadius: "12px",
};

const passwordContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    maxHeight: "400px",
  };
  
  const titleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontWeight: 600,
    color: "#333",
    textAlign: "center",
    marginBottom: "12px",
  };
  
  const inputStyle: React.CSSProperties = {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    maxWidth: "320px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginBottom: "16px",
  };
  
  const errorStyle: React.CSSProperties = {
    color: "red",
    fontSize: "12px",
    marginBottom: "12px",
  };
  
  const submitButtonStyle: React.CSSProperties = {
    padding: "12px 20px",
    border: "none",
    backgroundColor: "#FFB6C1",
    color: "white",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "12px",
    cursor: "pointer",
  };