import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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
  userName: string;
  userImage?: string;
  userIntroduction: string;
  userUuid: string;
  isOwner: boolean;
  isCertificated: boolean;
}

function GroupPeople({ group }: { group: MyGroup | null }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  const filteredMembers = members.filter((member) =>
    member.userName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleClick = (nickname: string) => {
    navigate(`/peopleinfo/${nickname}`);
  };

  useEffect(() => {
  const getMember = async () => {
    if (!group) return;

    try {
      const response = await apiClient.get(`/group/${group.id}`);
      console.log("Group Members:", response.data);

      const fetchedMembers: Member[] = response.data.members.map((m: any) => ({
        userName: m.userName,
        userImage: m.userImage,
        userIntroduction: m.userIntroduction,
        userUuid: m.userUuid,
        isOwner: m.isOwner,
        isCertificated: m.isCertificated,
      }));


      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Error fetching group members:", error);
    }
  };

  getMember();
}, [group]);



  return (
    <>
      <div style={barStyle}>
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
              key={member.userUuid}
              style={memberCardStyle}
              onClick={() => handleClick(member.userName)}
            >
              <img
                src={member.userImage}
                alt={member.userName}
                style={profileImageStyle}
              />
              <div style={infoStyle}>
                <div style={nameStyle}>
                  {member.userName}{" "}
                  <span style={roleStyle}>
                    {member.isOwner ? "👑 Leader" : "🙋 Member"}
                  </span>
                  <span style={statusStyle(member.isCertificated ? "참여완료" : "미참여")}>
                    {member.isCertificated ? "참여완료" : "미참여"}
                  </span>
                </div>
                <div style={bioStyle}>{member.userIntroduction}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GroupPeople;

const scrollAreaStyle: React.CSSProperties = {
  flex: 1,
  overflowY: "auto",
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
  padding: "8px 8px",
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
};

const profileImageStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  objectFit: "cover",
  marginRight: "16px",
};

const infoStyle: React.CSSProperties = {
  flex: 1,
};

const nameStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "bold",
  marginBottom: "4px",
};

const roleStyle: React.CSSProperties = {
  fontSize: "12px",
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
