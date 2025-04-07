import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import MoveLeftTitle from "../components/title/MoveLeftTitle";



function ChangeNickname() {
    const [nickname, setNickname] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    // const navigate = useNavigate();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };


    return (
        <div style={layoutStyle}>
            <MoveLeftTitle title="닉네임 변경" page="/profile"/>
            
            <div style={profileImageContainerStyle}>
                <label htmlFor="profile-upload">
                    <img 
                        src={profileImage || "https://via.placeholder.com/150"} 
                        alt="Profile" 
                        style={profileImageStyle} 
                    />
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
                <label htmlFor="nickname" style={labelStyle}>닉네임</label>
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
                <label htmlFor="bio" style={labelStyle}>자기소개</label>
                <input
                    id="bio"
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="자기소개를 입력하세요"
                    style={inputStyle}
                />
            </div>
            
            <button style={buttonStyle}>
                변경하기
            </button>
        </div>
    );
}

export default ChangeNickname;

const layoutStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    width: "100vw",
    height: "100vh",
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
    marginTop: "20px",
    width: "80%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
};
