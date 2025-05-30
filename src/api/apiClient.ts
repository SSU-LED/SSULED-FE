import axios, { InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
}

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지한다.
let refreshPromise: Promise<string> | null = null;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    // "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 모든 요천 전에 accessToken을 Authorization 헤더에 추가한다.
apiClient.interceptors.request.use(
  (config) => {
    if (config.url?.includes("/auth/refresh")) {
      return config;
    }
    const accessToken = window.localStorage.getItem("accessToken"); // localStorage에서 accessToken을 가져온다.

    // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가한다.
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 요청 설정을 반환
    return config;
  },
  // 요청 인터셉터가 실패하면, 에러 뽑음
  (error) => Promise.reject(error)
);

// 응답 인터센터: 401 에러 발생 -> refresh 토큰을 통한 토큰 갱신을 처리
apiClient.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 반환
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러면서, 아직 재시도 하지 않은 요청 경우 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // refresh 엔드포인트에서 401 에러가 발생한 경우(Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리
      if (originalRequest.url === "/auth/refresh") {
        // window.localStorage.removeItem("accessToken");
        // window.localStorage.removeItem("refreshToken");
        // window.location.href = "/login";
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      // 이미 리프레시 요청이 진행중이면, 그 Promise를 재사용합니다.
      if (!refreshPromise) {
        // refresh 요청 실행 후, 프라미스를 전역 변수에 할당
        refreshPromise = (async () => {
          const refreshToken = window.localStorage.getItem("refreshToken");
          console.log(refreshToken);

          const { data } = await apiClient.post(
            "/auth/refresh",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          console.log(data);
          // 새 토큰 반환
          window.localStorage.setItem("accessToken", data.access_token);
          if (data.refresh_token) {
            window.localStorage.setItem("refreshToken", data.refresh_token);
          }
          console.log("리프레시 토큰 재발급");

          // 새 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함
          return data.access_token;
        })()
          .catch((error) => {
            window.localStorage.removeItem("accessToken");
            window.localStorage.removeItem("refreshToken");
            window.location.href = "/login";
            console.log(error);
            return Promise.reject(error);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      // 진행중인 refreshPromise가 해결될때까지 기다림
      return refreshPromise.then((newAccessToken) => {
        // 원본 요청의 Authorization 헤더를 갱신된 토큰으로 업뎃
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 업데이트 된 원본 요청을 재시도합니다.
        return apiClient.request(originalRequest);
      });
    }
    // 401 에러가 아닌 경우에 그대로 오류를 반환
    return Promise.reject(error);
  }
);
