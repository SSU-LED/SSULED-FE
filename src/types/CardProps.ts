export type CardProps = {
    id: number;
    imageUrl: string;
    title?: string;
    content?: string;
    updatedAt?: string;
    onClick?: (id: number) => void;
};