import { Link } from "react-router-dom";
import LargeTitle from "../../components/title/LargeTitle";
import MediumTitle from "../../components/title/MediumTitle";
import { SiNaver } from "react-icons/si";
import { SiKakaotalk } from "react-icons/si";

function Login() {
  const NaverUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
    import.meta.env.VITE_NAVER_ID
  }&state=naver&redirect_uri=${import.meta.env.VITE_NAVER_REDIRECT_URL}`;

  const KakaoUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
    import.meta.env.VITE_KAKAO_REST_API_KEY
  }&state=kakao&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;
  return (
    <div style={layoutStyle}>
      <style>{responsiveCSS}</style>
      <div className="title-wrapper">
        <LargeTitle>
          💪🏻
          <br />
          오운완
        </LargeTitle>
      </div>
      <div className="brif-content-wrapper">
        운동 습관 형성과 커뮤니티 기반 <br /> 동기부여를 위한 웹 기반 운동 인증
        플랫폼
      </div>
      <div className="content-wrapper">
        <MediumTitle>소셜 로그인</MediumTitle>
        <div className="buttons-wrapper">
          <Link className="login-button" to={NaverUrl}>
            <SiNaver />
            네이버로 로그인
          </Link>
          <Link className="login-button" to={KakaoUrl}>
            <SiKakaotalk />
            카카오로 로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

const layoutStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  padding: "1rem",
  fontFamily: "sans-serif",
  textAlign: "center",
};

const responsiveCSS = `
    .title-wrapper {
        top: "24px",
        margin-bottom: 1rem;
    }

    .brif-content-wrapper {
        max-width: 500px;
        margin-bottom: 0.5rem;
        font-size: 1rem;
        color: #555;
        line-height: 1.5;
    }

    .content-wrapper {
        width: 100%;
        max-width: 400px;
    }

    .buttons-wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .login-button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.8rem 1.2rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        cursor: pointer;
        background-color: white;
        transition: background-color 0.2s ease;
    }

    .login-button:hover {
        background-color: #f0f0f0;
    }

    @media (min-width: 600px) {
        .buttons-wrapper {
            flex-direction: row;
        }
    }

    @media (max-width: 600px) {
        .brif-content-wrapper {
            font-size: 0.95rem;
            padding: 0 1rem;
        }

        .login-button {
            font-size: 0.95rem;
        }
    }
`;
