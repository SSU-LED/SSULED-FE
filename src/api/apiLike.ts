import { apiClient } from "./apiClient";

// 좋아요 추가
export const addLike = async (postId: number) => {
  try {
    const body = {
      postId
    };
    const response = await apiClient.post("/like", body);
    return response.data;
  } catch (error) {
    console.error("Error adding like:", error);
    throw error;
  }
};

// 좋아요 상태 확인
export const checkLikeStatus = async (postId: number) => {
  try {
    const response = await apiClient.get(`/like/${postId}`, {
      params: { postId }
    });
    return response.data;
  } catch (error) {
    console.error("Error checking like status:", error);
    throw error;
  }
}

// 게시글 좋아요 삭제
export const removeLike = async (postId: number) => {
    try {
        const response = await apiClient.delete(`/like/post/${postId}/user/`, {
        params: { postId }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing like:", error);
        throw error;
    }
}