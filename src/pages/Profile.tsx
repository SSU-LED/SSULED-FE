import { useEffect, useState } from "react";
import MoveRightTitle from "../components/title/MoveRightTitle";
import { apiClient } from "../api/apiClient";
import { useNavigate } from "react-router-dom";

interface IFUserInfo {
  userImage: string
  userIntroduction: string | null;
  userName: string
}

const Profile = () => {
  //오흔
  const defaultProfileImage = "https://via.placeholder.com/150";
  const [user, setUser] = useState<IFUserInfo | null>(null);
  const navigate = useNavigate();

  const handleLogoutAccount = async () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (!confirmLogout) return;
  
    try {
      const response = await apiClient.post("/user/logout");
      console.log(response);
  
      if (response.status >= 200 && response.status < 300) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeleteAccount = async() => {
    if (
      window.confirm(
        "정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      alert("계정이 삭제되었습니다.");
    }
  };

  useEffect(() => {
    const getProfile = async() => {
      const response = await apiClient.get("/user/userInfo");
      console.log(response.data);

      setUser(response.data);
    }
    getProfile();
  },[])

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
              src={user?.userImage ? user.userImage:  defaultProfileImage}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <div className="header-wrapper">
            <MoveRightTitle
              title={user?.userName ? user?.userName : "이름없음"}
              subtitle="닉네임 변경"
              to="/changenickname"
            />
          </div>
          <div className="bio-box">{user?.userIntroduction ? user.userIntroduction : '안녕하세요'}</div>
          <button className="logout-account" onClick={handleLogoutAccount}>
            logout
          </button>
          <button className="delete-account" onClick={handleDeleteAccount}>
            delete account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

const responsiveCSS = `
  .layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
    font-size: 14px;
    padding: 10px;
    text-align: center;
    width: 100%;
    max-width: 400px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #f9f9f9;
    color: #333;
    font-weight: 500;
  }

  .logout-account {
    background: none;
    border: none;
    color: black;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
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
