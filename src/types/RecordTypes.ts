import { Comment } from "./CommentTypes.ts";

export interface RecordUser {
  nickname: string;
  profileImage: string;
}

export interface RecordData {
  id: number;
  content: string;
  imageUrl: string[];
  bodyPart: ("chest" | "shoulders_arms" | "back" | string)[];
  duration: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  userUuid: string;
  title: string;
  user: RecordUser;
  userLiked: boolean;
  isMine: boolean;
  comments: Comment[];
}

export interface RecordMeta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface RecordResponse {
  data: RecordData[];
  meta: RecordMeta;
}

export interface RecordCreateRequest {
  content: string;
  imageUrl: string[];
  bodyPart: ("chest" | "shoulders_arms" | "back" | string)[];
  duration: number;
  isPublic: boolean;
}
