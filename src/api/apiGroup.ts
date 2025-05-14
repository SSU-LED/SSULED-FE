import { CreateGroupRequest } from '../types/GroupTypes';
import { apiClient } from './apiClient';

// 그룹 생성
export const createGroup = async (groupData: CreateGroupRequest) => {
    try {
        const response = await apiClient.post('/group', groupData);
        return response.data;
    } catch (error) {
        console.error('Error creating group:', error);
        throw error;
    }
}

// 그룹 수정
export const updateGroup = async (groupId: number, groupData: CreateGroupRequest) => {
    try {
        const response = await apiClient.patch(`/group/${groupId}`, groupData);
        return response.data;
    } catch (error) {
        console.error('Error updating group:', error);
        throw error;
    }
}
