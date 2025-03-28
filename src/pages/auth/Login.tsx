import { useNavigate } from "react-router-dom";
import LargeTitle from "../../components/LargeTitle";
import MediumTitle from "../../components/MediumTitle";
import { SiNaver } from "react-icons/si";
import { SiKakaotalk } from "react-icons/si";

function Login() {
    const navigate = useNavigate();

    const handleNaverLogin = () => {
        // TODO: Replace with real API when backend is ready
        // window.location.href = "https://your-api.com/api/auth/naver";
        navigate("/");
    };

    const handleKakaoLogin = () => {
        // TODO: Replace with real API when backend is ready
        // window.location.href = "https://your-api.com/api/auth/kakao";
        navigate("/");
    };

    return (
        <div style={layoutStyle}>
            <style>{responsiveCSS}</style>
            <div className="title-wrapper">
                <LargeTitle>SSULED💡</LargeTitle>
            </div>
            <div className="brif-content-wrapper">
                This app allows users to join or create workout groups 
                where they can check in and verify their daily exercise.
                Group members can view each other's check-ins, leave comments, 
                and motivate one another to stay consistent. 
            </div>
            <div className="content-wrapper">
                <MediumTitle>소셜 로그인</MediumTitle>
                <div className="buttons-wrapper">
                    <div className="login-button" onClick={handleNaverLogin}>
                        <SiNaver />
                        네이버로 로그인
                    </div>
                    <div className="login-button" onClick={handleKakaoLogin}>
                        <SiKakaotalk />
                        카카오로 로그인
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


const layoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '2rem',
    fontFamily: 'sans-serif',
    textAlign: 'center',
};


const responsiveCSS = `
    .title-wrapper {
        margin-bottom: 2rem;
    }

    .brif-content-wrapper {
        max-width: 500px;
        margin-bottom: 3rem;
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
