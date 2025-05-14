export type Comment = {
    id: number;
    content: string;
    postId: number;
    isMine: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
            nickname: string;
            profileImage: string;
        }   
}

export interface newComment {
    postId: number;
    content: string;
}

export interface commentCard {
  id: number;
  content: string;
  commentId: number;
  nickname: string;
  profileImage: string;
  isMine: boolean;
  onClick?: (id: number) => void;
}