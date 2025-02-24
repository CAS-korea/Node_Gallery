import {UserInfoDto} from "../types/UserInfoDto.ts";
import apiHandler from "../utils/ApiHandler.ts";

export const UserService = {
    async getUserInfo(userId: string): Promise<UserInfoDto> {
        const response = await apiHandler.get(`/user_relation/info/${userId}`);
        return response.data.userInformationDto;
    }
}