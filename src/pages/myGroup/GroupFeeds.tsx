import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import SmallCard from "../../components/card/SmallCard";
import GroupTabsbar from "../../components/GroupTabsbar";
import { Settings } from "lucide-react";
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
}

interface MyGroupPost {
  id: number;
  title: string;
  userUuid: string;
  content: string;
  imageUrl: string;
  isPublic: boolean;
  createAt: string;
  updateAt: string;
  likeCount: number;
  commentCount: number;
  isMine: boolean;
  nickname: string;
  profileImage: string;
}

function GroupFeeds() {
  const navigate = useNavigate();

  const [_isJoined, setIsJoined] = useState(true);
  const [group, setGroup] = useState<MyGroup | null>(null);
  const [post, setPost] = useState<MyGroupPost[]>([]);

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  const handleButtonClick = (id: number) => {
    const deleteMyGroup = async () => {
      const confirmLeave = window.confirm("정말 탈퇴하시겠습니까? 🥺");
      if (confirmLeave) {
        try {
          await apiClient.delete(`/group/${id}/leave`);
          setIsJoined(false);
          alert("그룹에서 탈퇴했습니다.");
          navigate(`/newgroup/${id}`);
        } catch (error) {
          console.error("그룹 탈퇴 실패:", error);
          alert("그룹 탈퇴 중 오류가 발생했습니다.");
        }
      }
    };
    deleteMyGroup();
  };

  useEffect(() => {
    const getMyGroup = async () => {
      const response = await apiClient.get("/group/user");
      console.log("MyGroup data:", response.data);
      if (response.data) {
        setGroup(response.data);
      }
    };
    getMyGroup();
  }, []);

  useEffect(() => {
    const getGroupPost = async () => {
      if (!group) return;

      try {
        const response = await apiClient.get(`/post/group/${group.id}`, {
          params: {
            page: 1,
            limit: 24,
          },
        });

        console.log("Group Posts:", response.data.data);

        console.log(response.data.data);
        setPost(
          response.data.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            userUuid: item.userUuid,
            content: item.content,
            imageUrl: item.imageUrl[0],
            isPublic: item.isPublic,
            createAt: item.createdAt,
            updateAt: item.updatedAt,
            likeCount: item.likeCount,
            commentCount: item.commentCount,
            isMine: item.isMine,
            nickname: item.user.nickname,
            profileImage: item.user.profileImage,
          }))
        );
      } catch (error) {
        console.error("그룹 게시물 불러오기 실패:", error);
      }
    };

    getGroupPost();
  }, [group]);

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
        {group && (
          <div style={centerTitleStyle}>{group.title}</div>
        )}
        <button style={iconButtonStyle} onClick={() => navigate("/edit-group")}>
          <Settings size={20} color="#555" />
        </button>
      </div>

      <div style={barStyle}>
        <div>
          <GroupTabsbar />
        </div>
      </div>

      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div style={listStyle}>
          {post.map((item, index) => (
            <SmallCard
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              content={item.content}
              id={item.id}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {group && (
        <button style={buttonStyle} onClick={() => handleButtonClick(group.id)}>
          탈퇴하기
        </button>
      )}
    </div>
  );
}

export default GroupFeeds;

// --- 스타일 ---

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
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const listStyle: React.CSSProperties = {
  display: "grid",
  gap: "12px",
  placeItems: "flex-start",
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

const headerWrapperStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 16px",
  marginBottom: "8px",
  height: "50px",
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

const iconButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: "8px",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s",
};
