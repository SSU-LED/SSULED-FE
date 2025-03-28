import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginKakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) return;

    fetch(`https://your-api.com/api/auth/kakao/callback?code=${code}`, {
      method: "GET",
      credentials: "include", // if using cookie session
    })
      .then(res => res.json())
      .then(data => {
        console.log("Login success:", data);
        // TODO: store token or user info in state/context
        navigate("/");
      })
      .catch(err => {
        console.error(err);
        navigate("/login");
      });
  }, [navigate]);

  return <div>Logging in with Kakao...</div>;
}

export default LoginKakaoCallback;
