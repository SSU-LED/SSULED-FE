export type GCardProps = {
  id: number;
  title: string;
  isAccessible?: boolean;
  memberCount?: number;
  maxMember?: number;
  onClick?: (id: number) => void;
};
