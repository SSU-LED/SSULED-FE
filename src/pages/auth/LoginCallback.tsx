import { useEffect } from "react";
import { apiClient } from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthStore";

export const LoginCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const getCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");

      if (code && state) {
        try {
          const { data } = await apiClient.post(`/auth/${state}`, {
            code,
          });

          login(data.access_token);
          window.localStorage.setItem("refreshToken", data.refresh_token);
          console.log("로그인 성공");
          navigate("/");
        } catch (error) {
          console.error("error: ", error);
          alert("로그인에 실패했습니다. 다시 시도해주세요.");
          navigate("/login");
        }
      }
    };

    getCode();
  }, [login, navigate]);

  return <div>로그인 처리 중...</div>;
};
