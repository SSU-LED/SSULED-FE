import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoveLeftTitle from "../components/title/MoveLeftTitle";
import { apiClient } from "../api/apiClient";
import { FaRegUserCircle } from "react-icons/fa";

function ChangeNickname() {
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await apiClient.get("/user/userInfo");
        console.log(response.data);
        setNickname(response.data.userName);
        setBio(response.data.userIntroduction || "");
        setProfileImage(response.data.userImage || "");
      } catch (error) {
        console.error("사용자 정보 조회 오류: ", error);
      }
    };
    getUserInfo();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const changenickname = async () => {
    try {
      const requestBody: any = {};
      if (nickname.trim() !== "") requestBody.newNickname = nickname;
      if (bio.trim() !== "") requestBody.newIntroduction = bio;
      if (profileImage.trim() !== "") requestBody.newProfileImg = profileImage;

      if (Object.keys(requestBody).length === 0) {
        alert("변경할 내용을 입력하세요.");
        return;
      }

      const response = await apiClient.post("/user/profile", requestBody);
      const { message } = response.data;

      if (response.status >= 200 && response.status < 300) {
        if (message === "프로필이 수정되었습니다.") {
          alert("프로필이 성공적으로 수정되었습니다.");
          navigate("/profile");
        } else {
          alert(message);
        }
      }
    } catch (error: any) {
      if (error.response?.data?.message === "사용자를 찾을 수 없습니다.") {
        alert("사용자를 찾을 수 없습니다.");
      } else {
        alert("프로필 수정 중 오류가 발생했습니다.");
      }
      console.error("Profile update error:", error);
    }
  };

  return (
    <div style={pageStyle}>
      <MoveLeftTitle title="닉네임 변경" page="/profile" />

      <div style={profileImageContainerStyle}>
        <label htmlFor="profile-upload">
          {profileImage ? (
            <img src={profileImage} alt="Profile" style={profileImageStyle} />
          ) : (
            <FaRegUserCircle size={120} />
          )}
        </label>
        <input
          type="file"
          id="profile-upload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="nickname" style={labelStyle}>
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
          style={inputStyle}
        />
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="bio" style={labelStyle}>
          자기소개
        </label>
        <input
          id="bio"
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="자기소개를 입력하세요"
          style={inputStyle}
        />
      </div>
      <button style={buttonStyle} onClick={changenickname}>
        변경하기
      </button>
    </div>
  );
}

export default ChangeNickname;

const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100vh",
  alignItems: "center",
  overflow: "hidden",
};

const profileImageContainerStyle: React.CSSProperties = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  overflow: "hidden",
  marginTop: "20px",
  position: "relative",
  cursor: "pointer",
};

const profileImageStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "50%",
};

const inputContainerStyle: React.CSSProperties = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "80%",
};

const labelStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "bold",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  width: "80%",
  padding: "10px 20px",
  border: "none",
  fontSize: "16px",
  fontWeight: 500,
  backgroundColor: "#FFB6C1",
  color: "black",
  cursor: "pointer",
  borderRadius: "12px",
  marginTop: "100px",
};
