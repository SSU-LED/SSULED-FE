import { apiClient } from './apiClient';
import { RecordCreateRequest, RecordData } from '../types/RecordTypes.ts';

function base64ToBlob(base64: string): Blob {
  const parts = base64.split(",");
  const mime = parts[0].match(/:(.*?);/)?.[1] || "";
  const binary = atob(parts[1]);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

// 사진 업로드
export const uploadImage = async (base64Image: string) => {
  const blob = base64ToBlob(base64Image);
  const formData = new FormData();
  formData.append("image", blob, "photo.jpg");
  console.log("📸 업로드할 Blob:", blob);
  console.log("📦 FormData:", formData.get("image"));
  try {
    const response = await apiClient.post('/upload/image', formData);
    return response.data.imageUrl;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  };
}

export const deleteImage = async (url: string) => {
  try {
    const response = await apiClient.delete(`/upload/image/${url}`);
    return response;
  } catch (error) {
    console.error("Error Deleting image: ", error);
    throw error;
  };
}

// 게시글 생성
export const createRecord = async (recordData: RecordCreateRequest) => {
  try {
    const response = await apiClient.post('/post', recordData);
    return response.data;
  } catch (error) {
    console.error("Error creating record:", error);
    throw error;
  }
};

// 사용자 게시글 조회
export const fetchAllRecords = async (page: number, limit: number) => {
  try {
    const response = await apiClient.get('/post', {
      params: { page, limit },
    });
    return response.data;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 500) {
        console.warn("500 error: returning null");
        return null;
      }
    }
    console.error("Error fetching popular records:", error);
    throw error;
  }
};


// 인기 게시글 조회
export const fetchPopularRecords = async (page: number, limit: number) => {
  try {
    console.log("Fetching posts with", { page, limit });

    const response = await apiClient.get('/post/popular', {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular records:", error);
    throw error;
  }
};

// 게시글 상세 조회
export const fetchRecordById = async (id: string) => {
  try {
    const response = await apiClient.get(`/post/${id}`);
    console.log("Fetching post with ID:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching record by ID:", error);
    throw error;
  }
};

// 게시글 수정
export const updateRecord = async (id: number, recordData: RecordData) => {
  try {
    const response = await apiClient.patch(`/post/${id}`, recordData);
    return response.data;
  } catch (error) {
    console.error("Error updating record:", error);
    throw error;
  }
};

// 게시글 삭제
export const deleteRecord = async (id: number) => {
  try {
    const response = await apiClient.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting record:", error);
    throw error;
  }
};

// 그룹 게시글 조회
export const fetchGroupRecords = async (groupId: number, page: number, limit: number) => {
  try {
    const response = await apiClient.get(`/post/group/${groupId}`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching group records:", error);
    throw error;
  }
};
