import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import SmallCard from "../../components/card/SmallCard";
import { apiClient } from "../../api/apiClient";

export interface IFMember {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  user: {
    nickname: string;
    profileImage?: string; 
  };
}

function GroupFeeds() {
  // const tempData: CardProps[] = rawData;
  const navigate = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();

  const [memberData, setMemberData] = useState<IFMember[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  useEffect(() => {
    const fetchMemberData = async () => {
        try {
          if (!nickname) return;
          const res = await apiClient.get(`/post/user/${nickname}`);
          setMemberData(res.data.data);
          console.log("멤버 상세 정보:", res.data);
        } catch (error) {
          console.error("멤버 정보를 불러오는 데 실패했습니다.", error);
        } finally {
          setLoading(false);
        }
    };

    fetchMemberData();
  }, [nickname]);

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
  
      <div style={headerWrapperStyle}>
        <MoveLeftTitle title={`${nickname}의 모든 기록`} page="/grouppeople" />
      {memberData?.[0]?.user?.nickname && (
        <div style={centerTitleStyle}>{memberData[0].user.nickname}의 기록</div>
      )}
      </div>
      
      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div style={listStyle}>
          {loading ? (
            <p>멤버 정보를 불러오는 중입니다...</p>
          ) : memberData.length > 0 ? (
            memberData.map((post) => (
              <SmallCard
                key={post.id}
                imageUrl={post.imageUrl ?? ""}
                title={post.title}
                id={post.id}
                onClick={handleCardClick}
              />
            ))
          ) : (
            <p>기록이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupFeeds;

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

const headerWrapperStyle: React.CSSProperties = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 16px",
  marginBottom: "8px",
  height: "50px",
};