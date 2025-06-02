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

// 사용자가 속한 그룹 조회
export const fetchMyGroup = async () => {
    try {
        const response = await apiClient.get('/group/user');
        return response.data;
    } catch (error) {
        console.error('Error fetching my group:', error);
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

// 그룹 상세 조회
export const fetchGroup = async (groupId: number) => {
    try {
        const response = await apiClient.get(`/group/${groupId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching group:', error);
        throw error;
    }
}

// 그룹 삭제
export const deleteGroup = async (groupId: number) => {
    try {
        const response = await apiClient.delete(`/group/${groupId}`);
        return response;
    } catch (error) {
        console.error('Error fetching group:', error);
        throw error;
    }
}