export interface CreateGroupRequest {
    title: string;
    password: string;
    isAccessible: boolean;
    maxMember: number;
}

interface GroupMember {
  userName: string;
  userImage: string;
  userIntroduction: string;
}

export interface GroupInfo {
  id: number;
  title: string;
  isAccessible: boolean;
  maxMember: number;
  createdAt: string; // ISO 8601 날짜 문자열
  updatedAt: string; // ISO 8601 날짜 문자열
  isOwner: boolean;
  members: GroupMember[];
}