import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import { apiClient } from "../../api/apiClient";
import { FaUsers } from "react-icons/fa";
import SmallCard from "../../components/card/SmallCard";
import { IoClose } from "react-icons/io5";

export interface IFGroup {
  createdAt: string;
  id: number;
  isAccessible: boolean;
  maxMember: number;
  memberCount: number;
  memberUuid?: string[];
  ownerUuid?: string;
  password?: string | null;
  title: string;
  updatedAt: string;
  imageUrl?: string;
  content?: string;
}

interface GroupPostItem {
  id: number;
  title: string | null;
  userUuid: string;
  content: string;
  imageUrl: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  isMine: boolean;
  user: {
    nickname: string;
    profileImage: string;
  };
}

function NewGroup() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isJoined, setIsJoined] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [groupData, setGroupData] = useState<IFGroup | null>(null);
  const [posts, setPosts] = useState<GroupPostItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 오늘 날짜를 YYYY.MM.DD 형식으로 반환하는 함수
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

    useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (!id) return;
        const res = await apiClient.get(`/group/${id}`);
        console.log("API 응답 데이터:", res.data);

        // memberCount가 없거나 undefined인 경우, members 배열의 길이를 사용
        const memberCount =
          res.data.memberCount !== undefined
            ? res.data.memberCount
            : res.data.members
            ? res.data.members.length
            : 0;

        setGroupData({
          ...res.data,
          memberCount: memberCount,
        });

        console.log("그룹 데이터 로드 중...");
        console.log("그룹 상세 정보:", res.data);

        // 사용자가 그룹에 이미 가입되어 있는지 확인
        try {
          const userGroupRes = await apiClient.get("/group/user");
          if (userGroupRes.data && userGroupRes.data.id === Number(id)) {
            setIsJoined(true);
          }
        } catch (error) {
          console.error("사용자 그룹 정보 확인 실패:", error);
        }

        // 그룹 게시글 불러오기 (가입 여부와 상관없이)
        try {
          const postsRes = await apiClient.get(`/post/group/${id}`, {
            params: { page: 1, limit: 24 },
          });
          setPosts(postsRes.data.data || []);
          console.log("그룹 게시글:", postsRes.data.data);
        } catch (error) {
          console.error("그룹 게시글 불러오기 실패:", error);
        }

        setLoading(false);
      } catch (error) {
        console.error("그룹 정보를 불러오는 데 실패했습니다", error);
        setLoading(false);
      }
    };

    const getMyGroup = async () => {
      try {
        const res = await apiClient.get("/group/user");
        if (res.data) {
          setIsJoined(true);
        }
      } catch (error) {
        console.error("내 그룹 정보 불러오기 에러: ", error);
      }
    };

    fetchGroupData();
    getMyGroup();
  }, [id]);

  const handleButtonClick = async () => {
  if (!groupData) return;

  // 이미 가입된 그룹인 경우 경고
  if (isJoined) {
    alert("이미 가입한 그룹이 있습니다.");
    return;
  }
  
  const isPublic = groupData.isAccessible;

  if (isPublic) {
    // 공개 그룹 → 바로 등록
    try {
      await apiClient.post(`/group/${id}/join`);
      alert("그룹에 등록되었습니다!");
      setIsJoined(true);
      navigate("/mygroup");
    } catch (error: any) {
      console.error("공개 그룹 등록 실패", error.response?.data || error.message);
      alert(error.response?.data?.message || "그룹 등록 중 오류가 발생했습니다.");
    }
  } else {
    // 비공개 그룹 → 비밀번호 입력창 열기
    setShowPasswordInput(true);
  }
};

const handlePasswordSubmit = async () => {
  if (isJoined) {
    alert("이미 가입한 그룹이 있습니다.");
    return;
  }

  if (!password) {
    setPasswordError("비밀번호를 입력하세요.");
    return;
  }

  try {
    await apiClient.post(`/group/${id}/join`, { password });
    alert("그룹에 등록되었습니다!");
    setIsJoined(true);
    navigate("/mygroup");
  } catch (error: any) {
    console.error("비공개 그룹 등록 실패", error.response?.data || error.message);
    if (error.response?.status === 401 || error.response?.status === 400) {
      setPasswordError("비밀번호가 틀렸습니다!");
    } else {
      alert(error.response?.data?.message || "그룹 등록 중 오류가 발생했습니다.");
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

      <MoveLeftTitle title={groupData?.title ?? ""} page="/group" />

      {groupData && (
        <div style={groupInfoHeaderStyle}>
          <div style={memberCountStyle}>
            <FaUsers style={{ marginRight: "8px" }} />
            <span>
              {groupData.memberCount !== undefined
                ? groupData.memberCount
                : "0"}
              /{groupData.maxMember} 멤버
            </span>
          </div>
          <div style={accessInfoStyle}>
            {groupData.isAccessible ? (
              <span style={{ color: "green" }}>공개 그룹</span>
            ) : (
              <span style={{ color: "orange" }}>비공개 그룹</span>
            )}
          </div>
        </div>
      )}

      <div className="no-scrollbar" style={scrollAreaStyle}>
        {loading ? (
          <div style={loadingStyle}>로딩 중...</div>
        ) : (
          <div>
            {!isJoined && (
              <div style={notJoinedMessageStyle}>
                <p>이 그룹에 가입하고 다양한 활동을 즐겨보세요!</p>
              </div>
            )}

            <div style={listStyle}>
              {posts.length === 0 ? (
                <div style={noPostMessageStyle}>아직 게시글이 없습니다.</div>
              ) : (
                posts.map((item, index) => (
                  <SmallCard
                    key={index}
                    imageUrl={item.imageUrl[0]}
                    title={item.title ? item.title : getTodayDate()}
                    content={item.content}
                    id={item.id}
                    likeCount={item.likeCount}
                    commentCount={item.commentCount}
                    onClick={handleCardClick}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {!isJoined && !showPasswordInput && (
        <button style={buttonStyle} onClick={handleButtonClick}>
          등록하기
        </button>
      )}

      {showPasswordInput && (
        <div style={passwordContainerStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => setShowPasswordInput(false)}
          >
            <IoClose />
          </div>
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
  alignItems: "center",
  width: "100%",
  height: "100vh",
  overflow: "hidden",
};


const groupInfoHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "0 16px 8px 16px",
  borderBottom: "1px solid #eee",
  width: "100%",
  marginTop: "16px",
};

const scrollAreaStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
  padding: "16px",
  width: "100%",
};

const loadingStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  fontSize: "16px",
  color: "#666",
};

const listStyle: React.CSSProperties = {
  display: "grid",
  gap: "12px",
  placeItems: "flex-start",
};

const noPostMessageStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 0",
  fontSize: "16px",
  color: "#666",
  textAlign: "center",
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
};

const notJoinedMessageStyle: React.CSSProperties = {
  backgroundColor: "#f8f9fa",
  padding: "16px",
  borderRadius: "8px",
  marginBottom: "20px",
  textAlign: "center",
  color: "#555",
};

const memberCountStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "16px",
  color: "#444",
};

const accessInfoStyle: React.CSSProperties = {
  fontSize: "14px",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 5px",
  border: "none",
  fontSize: "16px",
  fontWeight: 500,
  backgroundColor: "black",
  color: "white",
  cursor: "pointer",
  borderRadius: "12px",
  marginBottom: "60px",
  width: "400px",
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
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
  width: "400px",
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
  backgroundColor: "black",
  color: "white",
  fontSize: "16px",
  fontWeight: "500",
  borderRadius: "12px",
  cursor: "pointer",
};
