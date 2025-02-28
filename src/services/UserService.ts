import { UserInfoDto } from "../types/UserInfoDto.ts";
import { UserProfileDto } from "../types/UserProfileDto.ts";
import apiHandler from "../utils/ApiHandler.ts";
import type { FollowUser } from "../components/profile/FollowModal"; // 또는 별도 파일에서 관리

export const UserService = {
    async getUserInfo(userId: string): Promise<UserInfoDto> {
        const response = await apiHandler.get(`/user_relation/info/${userId}`);
        return response.data.userInformationDto;
    },
    async getUserProfile(userId: string): Promise<UserProfileDto> {
        const response = await apiHandler.get(`/user_relation/info/${userId}`);
        return response.data.data;
    },
    async followUser(followingId: string): Promise<string> {
        const response = await apiHandler.post(`/user_relation/follow/${followingId}`);
        return response.data;
    },
    async getFollowers(userId: string): Promise<FollowUser[]> {
        const response = await apiHandler.get(`/user_relation/followers/${userId}`);
        return response.data.data; // API가 팔로워 리스트를 반환한다고 가정
    },
    async getFollowing(userId: string): Promise<FollowUser[]> {
        const response = await apiHandler.get(`/user_relation/following/${userId}`);
        return response.data.data; // API가 팔로잉 리스트를 반환한다고 가정
    },
};
