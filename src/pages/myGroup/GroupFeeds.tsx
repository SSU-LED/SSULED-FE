import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import GroupTabsbar from "../../components/GroupTabsbar";
import { Settings } from "lucide-react";
import { apiClient } from "../../api/apiClient";
import { FaHeart } from "react-icons/fa6";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

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

interface MyGroupPost {
  id: number;
  title: string | null;
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
  }
    
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

        const posts = response.data.data as GroupPostItem[];
        setPost(
          posts.map((item) => ({
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

        {group && <div style={centerTitleStyle}>{group.title}</div>}
        {group && (
          <button
            style={iconButtonStyle}
            onClick={() => navigate(`/edit-group`)}
          >
            <Settings size={20} color="#555" />
          </button>
        )}
      </div>
      {group ? (
        <>
          {" "}
          <div style={barStyle}>
            <div>
              <GroupTabsbar />
            </div>
          </div>
          <div className="no-scrollbar" style={scrollAreaStyle}>
            <div style={feedListStyle}>
              {post.length === 0 ? (
                <div style={noPostMessageStyle}>아직 게시물이 없습니다.</div>
              ) : (
                post.map((item, index) => (
                  <div key={index} style={feedCardStyle}>
                    <div style={feedHeaderStyle}>
                      <div style={userInfoStyle}>
                        <img
                          src={item.profileImage}
                          alt={item.nickname}
                          style={profileImageStyle}
                          onError={(e) => {
                            e.currentTarget.src = `https://via.placeholder.com/40/FFB6C1/FFFFFF?text=${item.nickname.charAt(
                              0
                            )}`;
                          }}
                        />
                        <span style={usernameStyle}>{item.nickname}</span>
                      </div>
                      <span style={dateStyle}>
                        {new Date(item.createAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        cursor: "pointer",
                      }}
                      onClick={() => handleCardClick(item.id)}
                    >
                      <div
                        style={{
                          fontSize: "20px",
                          marginBottom: "5px",
                          fontWeight: "bold",
                          marginLeft: "15px",
                        }}
                      >
                        {item.title}
                      </div>
                      <img src={item.imageUrl} />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginRight: "15px",
                          marginTop: "10px",
                          gap: "10px",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            marginTop: "auto",
                            fontSize: "14px",
                            color: "#666",
                            gap: "2px",
                          }}
                        >
                          <FaHeart /> {item.likeCount || 0}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            marginTop: "auto",
                            fontSize: "15px",
                            color: "#666",
                            gap: "2px",
                          }}
                        >
                          <IoChatboxEllipsesOutline /> {item.commentCount || 0}
                        </span>
                      </div>
                    </div>

                    <div style={interactionBarStyle}></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={noDataStyle}>
            <p>아직 가입한 그룹이 없습니다.</p>
            <p>그룹에 가입해서 같이 운동해보세요!</p>
          </div>
        </>
      )}
    </div>
  );
}

export default GroupFeeds;

// --- 스타일 ---

const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
  display: "flex",
  flexDirection: "column",
};

const feedListStyle: React.CSSProperties = {
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

const headerWrapperStyle: React.CSSProperties = {
  position: "relative",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
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

const feedCardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #eee",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  marginBottom: "16px",
};

const feedHeaderStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "12px",
};

const userInfoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const profileImageStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
};

const usernameStyle: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "16px",
  color: "#000",
};

const dateStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#666",
  marginLeft: "auto",
};

const interactionBarStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "12px",
};

const noDataStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "30px 70px",
  backgroundColor: "#f8f8f8",
  borderRadius: "12px",
  color: "#666",
};
