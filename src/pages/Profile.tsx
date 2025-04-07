import React, { useState } from "react";
import MoveRightTitle from "../components/title/MoveRightTitle";

const Profile = () => { //오흔
    const [nickname] = useState<string>("숭실대벤치프레스");
    const [bio] = useState("안녕? 나 3대 50 ㅋ");
    const defaultProfileImage = "https://via.placeholder.com/150";

    const handleDeleteAccount = () => {
        if (window.confirm("정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
            alert("계정이 삭제되었습니다.");
            // 실제 계정 삭제 로직 추가 가능
        }
    };

    return (
        <div className="layout">
            <style>{responsiveCSS}</style>
            <div className="header-wrapper">
                <header className="header-title">Profile</header>
            </div>
            <div className="profile-wrapper">
                <div className="profile-container">
                    <div className="profile-image-container">
                        <img 
                            src={defaultProfileImage} 
                            alt="Profile" 
                            className="profile-image" 
                        />
                    </div>
                    <div className="header-wrapper">
                        <MoveRightTitle title={nickname} subtitle="닉네임 변경" to="/changenickname" />
                    </div>
                    <div className="bio-box">{bio}</div>
                    <button className="delete-account" onClick={handleDeleteAccount}>delete account</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;

const responsiveCSS = `
  .layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    padding: 24px 16px;
  }
  
  .header-wrapper {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: white;
    padding: 20px;
    border-bottom: 1px solid #eee;
    text-align: center;
    width: 100%;
  }
  
  .header-title {
    font-size: 28px;
    font-weight: bold;
  }
  
  .profile-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 40px;
  }
  
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 90%;
    max-width: 500px;
  }
  
  .profile-image-container {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    overflow: hidden;
    position: relative;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .bio-box {
    font-size: 16px;
    padding: 18px;
    text-align: center;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #f9f9f9;
    color: #333;
    font-weight: 500;
  }

  .delete-account {
    background: none;
    border: none;
    color: red;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
  }
`;
