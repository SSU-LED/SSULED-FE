import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import SmallCard from "../../components/card/SmallCard";
import { apiClient } from "../../api/apiClient";

interface MyGroup {
  id: number;
  ownerUuid: string;
  memberUuid: string[];
  title: string;
  isAccessible: boolean;
  maxMember: number;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface IFGroup {
  id: number;
  title: string;
  isAccessible: boolean;
  createdAt: string;
  updatedAt: string;
  members: {
    userName: string;
    userImage: string;
    userIntroduction: string;
    userUuid: string;
    isOwner: boolean;
    isCertificated: boolean;
  }[];
}

function NewGroup() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [_isJoined, setIsJoined] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [groupData, setGroupData] = useState<IFGroup | null>(null);
  const [_myGroupIds, setMyGroupIds] = useState<number[]>([]);
  const [isMyGroup, setIsMyGroup] = useState(false);
  
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

  useEffect(() => {
  const getMyGroup = async () => {
    try {
      const response = await apiClient.get("/group/user");
      console.log("MyGroup data:", response.data);
      const ids = response.data.map((g: MyGroup) => g.id);
      setMyGroupIds(ids);

      // 현재 그룹 ID가 내 그룹 목록에 있는지 확인
      if (id && ids.includes(Number(id))) {
        setIsMyGroup(true);
      } else {
        setIsMyGroup(false);
      }
    } catch (error: any) {
      console.error("내 그룹 정보 조회 실패", error.response?.data || error.message);
      if (error.response?.status === 404) {
        // 그룹이 하나도 없을 경우
        setIsMyGroup(false);
      }
    }
  };
  getMyGroup();
}, [id]);

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  const handleButtonClick = () => {
  if (groupData?.isAccessible) {
    // 공개 그룹이면 바로 등록 시도
    handlePasswordSubmit();
  } else {
    // 비공개 그룹이면 비밀번호 입력창 보여줌
    setShowPasswordInput(true);
  }
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
          {groupData && groupData.members.length > 0 ? (
            <SmallCard
              key={groupData.id}
              imageUrl={
                groupData.members.find((m) => m.isOwner)?.userImage ?? ""
              }
              title={groupData.title}
              id={groupData.id}
              onClick={handleCardClick}
            />
          ) : (
            <p>그룹 정보를 불러오는 중입니다...</p>
          )}
        </div>
      </div>


      {isMyGroup && (
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