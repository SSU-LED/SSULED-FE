import { apiClient } from './apiClient';

// 댓글 생성
export const createComment = async (postId: number, content: string) => {
  try {
    const body = {
      postId,
      content,
    };
    const response = await apiClient.post('/comment', body);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

// 모든 댓글 조회
export const fetchAllComments = async (postId: number) => {
  try {
    const response = await apiClient.get('/comment/post/${postId}', {
      params: { postId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all comments:', error);
    throw error;
  }
};

// 댓글 상세 조회
export const fetchCommentById = async (commentId: number) => {
  try {
    const response = await apiClient.get(`/comment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comment by ID:', error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (commentId: number, content: string) => {
  try {
    const body = {
      content,
    };
    const response = await apiClient.patch(`/comment/${commentId}`, body);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: number) => {
  try {
    const response = await apiClient.delete(`/comment/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};