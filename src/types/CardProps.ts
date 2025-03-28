export type CardProps = {
    id: number;
    imageUrl: string;
    title: string;
    content?: string;
    onClick?: (id: number) => void;
};