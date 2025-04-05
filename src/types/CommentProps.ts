export type CommentProps = {
    id: number;
    imageUrl: string;
    nickname: string;
    comment?: string;
    onClick?: (id: number) => void;
};