export interface CreateGroupRequest {
    title: string;
    password: string;
    isAccessible: boolean;
    maxMember: number;
}

export interface Group {
    id: number;
    ownerUuid: string;
    memberUuid: string[];
    title: string;
    password: null | string;
    isAccessible: boolean;
    maxMember: number;
    createdAt: string;
    updatedAt: string;
    // isMine: boolean;
}
