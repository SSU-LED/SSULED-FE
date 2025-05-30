import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import MoveLeftTitle from "../../components/title/MoveLeftTitle";
import GroupTabsbar from "../../components/GroupTabsbar";
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

interface Member {
  id: number;
  name: string;
  role: "Leader" | "Member";
  profileImage: string;
  bio: string;
  status: "참여완료"|"미참여";
}

function GroupPeople() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [group, setGroup] = useState<MyGroup | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleClick = (id: number) => {
    navigate(`/peopleinfo/${id}`);
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
  const getMember = async () => {
    if (!group) return;

    try {
      const response = await apiClient.get(`/group/${group.id}`);
      console.log("Group Members:", response.data);

      const fetchedMembers: Member[] = response.data.members.map((m: any) => ({
        id: m.id,
        name: m.userName,
        role: m.isOwner ? "Leader" : "Member",
        profileImage: m.userImage,
        bio: m.userIntroduction,
        status: m.status || "미참여", // status 정보가 있으면 사용, 없으면 기본값
      }));

      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Error fetching group members:", error);
    }
  };

  getMember();
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
      </div>
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
                  <span style={statusStyle(member.status)}>
                    {member.status === "참여완료" ? "참여완료" : "미참여"}
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

const statusStyle = (status: string): React.CSSProperties => ({
  marginLeft: "8px",
  fontSize: "14px",
  fontWeight: "normal",
  color: status === "참여완료" ? "#888" : "#FFB6C1", 
});

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