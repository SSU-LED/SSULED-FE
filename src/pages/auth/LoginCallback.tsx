import { useEffect } from "react";
import { apiClient } from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

export const LoginCallback = () => {
  const navigate = useNavigate();
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
          window.localStorage.setItem("accessToken", data.access_token);
          window.localStorage.setItem("refreshToken", data.refresh_token);
          console.log("로그인 성공");

          navigate("/");
        } catch (error) {
          console.error("error: ", error);
          alert("로그인에 실패했습니다..다시 시도해주세요.");
          navigate("/login");
        }
      }
    };

    getCode();
  }, []);
  return <div></div>;
};
