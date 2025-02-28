import { UserInfoDto } from "../types/UserInfoDto.ts";
import { UserProfileDto } from "../types/UserProfileDto.ts"; // 이 타입을 추가해야 합니다
import apiHandler from "../utils/ApiHandler.ts";

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
        return response.data; // 백엔드에서 반환되는 문자열 (예: "Followed successfully")
    },

};
