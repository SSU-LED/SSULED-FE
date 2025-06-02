export type CardProps = {
  id: number;
  imageUrl: string;
  title?: string;
  content?: string;
  updatedAt?: string;
  likeCount?: number;
  commentCount?: number;
  onClick?: (id: number) => void;
};
