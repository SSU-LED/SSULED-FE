import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import GroupTabsbar from "../../components/GroupTabsbar";

interface Member {
  id: number;
  name: string;
  role: "Leader" | "Member";
  profileImage: string;
  bio: string;
}

const dummyMembers: Member[] = [
  {
    id: 1,
    name: "배졍",
    role: "Leader",
    profileImage: "https://via.placeholder.com/80",
    bio: "안녕하세요? 주디에요 ^!^",
  },
  {
    id: 2,
    name: "말하는 고구마",
    role: "Member",
    profileImage: "https://via.placeholder.com/80",
    bio: "장래희망 : 감자",
  },
  {
    id: 3,
    name: "숭실대벤치프레스",
    role: "Member",
    profileImage: "https://via.placeholder.com/80",
    bio: "3대 50",
  },
  {
    id: 4,
    name: "포켓몬 마스터",
    role: "Member",
    profileImage: "https://via.placeholder.com/80",
    bio: "내 피카츄 어디갔어!?",
  },
];

function GroupPeople() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const filteredMembers = dummyMembers.filter((member) =>
    member.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleClick = (id: number) => {
    navigate(`/peopleinfo/${id}`);
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
      <MoveLeftTitle title="My Group" page="/group" />
      <div style={barStyle}>
        <div>
          <GroupTabsbar />
        </div>
        <input
          type="text"
          placeholder="팀원 이름 검색..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={searchInputStyle}
        />
      </div>
      <div className="no-scrollbar" style={scrollAreaStyle}>
        <div style={memberListStyle}>
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              style={memberCardStyle}
              onClick={() => handleClick(member.id)}
            >
              <img
                src={member.profileImage}
                alt={member.name}
                style={profileImageStyle}
              />
              <div style={infoStyle}>
                <div style={nameStyle}>
                  {member.name}{" "}
                  <span style={roleStyle}>
                    {member.role === "Leader" ? "👑 Leader" : "🙋 Member"}
                  </span>
                </div>
                <div style={bioStyle}>{member.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupPeople;

// --- 스타일 정의 ---

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

const searchInputStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const memberListStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const memberCardStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: "12px",
  padding: "12px 16px",
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
};

const profileImageStyle: React.CSSProperties = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover",
  marginRight: "16px",
};

const infoStyle: React.CSSProperties = {
  flex: 1,
};

const nameStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "4px",
};

const roleStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "normal",
  marginLeft: "8px",
  color: "#888",
};

const bioStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#555",
};
