import React from "react";
import { useNavigate } from "react-router-dom";
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

function GroupFeeds({ group, post }: {
  group: MyGroup | null;
  post: MyGroupPost[];
}) {
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  return (
    <>
      {group ? (
        <>
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
                          fontSize: "16px",
                          marginBottom: "6px",
                          fontWeight: "bold",
                          marginLeft: "8px",
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
    </>
  );
}

export default GroupFeeds;


const scrollAreaStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
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
  padding: "8px",
};

const userInfoStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const profileImageStyle: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "50%",
};

const usernameStyle: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "14px",
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
