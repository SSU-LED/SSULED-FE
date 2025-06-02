import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import SmallCard from "../../components/card/SmallCard";
import { apiClient } from "../../api/apiClient";

export interface IFGroup {
  createdAt: string;
  id: number;
  isAccessible: boolean;
  maxMember: number;
  memberUuid: string[];
  ownerUuid: string;
  password: string | null;
  title: string;
  updatedAt: string;
  imageUrl?: string; 
  content?: string; 
}

function NewGroup() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isJoined, setIsJoined] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [groupData, setGroupData] = useState<IFGroup | null>(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (!id) return;
        const res = await apiClient.get(`/group/${id}`);
        setGroupData(res.data);
        console.log("그룹 상세 정보:", res.data);
      } catch (error) {
        console.error("그룹 정보를 불러오는 데 실패했습니다", error);
      }
    };

    fetchGroupData();
  }, [id]);

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  const handleButtonClick = () => {
    setShowPasswordInput(true);
  };

  const handlePasswordSubmit = async () => {
    const isPublic = groupData?.isAccessible;

    if (!isPublic && !password) {
      setPasswordError("비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await apiClient.post(
        `/group/${id}/join`,
        isPublic ? {} : { password }
      );
      console.log("참여 성공:", response.data);
      alert("그룹에 등록되었습니다!");
      setIsJoined(true);
      navigate("/groupfeeds");
    } catch (error: any) {
      console.error("그룹 참여 실패", error.response?.data || error.message);
      if (error.response?.status === 401 || error.response?.status === 400) {
        setPasswordError("비밀번호가 틀렸습니다!");
      } else {
        alert("그룹 참여 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div style={pageStyle}>
      <style>
        {`
          .no-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div style={headerWrapperStyle}>
        <MoveLeftTitle title="My Group" page="/group" />
        {groupData && (
          <div style={centerTitleStyle}>{groupData.title}</div>
        )}
      </div>

      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div style={listStyle}>
          {groupData ? (
            <SmallCard
              key={groupData.id}
              imageUrl={groupData.imageUrl ?? ""}
              title={groupData.title}
              id={groupData.id}
              onClick={handleCardClick}
            />
          ) : (
            <p>그룹 정보를 불러오는 중입니다...</p>
          )}
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
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
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

export default NewGroup;

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

const listStyle: React.CSSProperties = {
  display: "grid",
  gap: "12px",
  placeItems: "flex-start",
};

const headerWrapperStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 16px",
  marginBottom: "8px",
  height: "50px",
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
  marginBottom: "60px",
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
  marginBottom: "60px",
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

const centerTitleStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  fontWeight: "bold",
  fontSize: "18px",
  whiteSpace: "nowrap",
  color: "#000", 
  zIndex: 101, 
};