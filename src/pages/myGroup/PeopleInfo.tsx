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
  }
}[];

function GroupFeeds() {
  // const tempData: CardProps[] = rawData;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [memberData, setMemberData] = useState<IFMember | null>(null);

  const handleCardClick = (id: number) => {
    navigate(`/records/${id}`);
  };

  useEffect(() => {
    const fetchMemberData = async () => {
        try {
          if (!id) return;
          const res = await apiClient.get(`/post/${id}`);
          setMemberData(res.data);
          console.log("멤머 상세 정보:", res.data);
        } catch (error) {
          console.error("멤버 정보를 불러오는 데 실패했습니다.", error);
        }
    };

    fetchMemberData();
  }, [id]);

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
      <MoveLeftTitle title="{id}의 모든 기록" page="/grouppeople" />
      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div style={listStyle}>
          {memberData ? (
            <SmallCard
              key={memberData.id}
              imageUrl={memberData.imageUrl ?? ""}
              title={memberData.title}
              id={memberData.id}
              onClick={handleCardClick}
            />
          ) : (
            <p>멤버 정보를 불러오는 중입니다...</p>
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
  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
  gap: "16px",
  placeItems: "center",
};
