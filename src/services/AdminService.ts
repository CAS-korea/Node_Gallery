import {UserEntity} from "../types/UserEntity.ts";
import apiHandler from "../utils/ApiHandler.ts";

export const AdminService = {
    async getUserList(): Promise<UserEntity[]> {
        const response = await apiHandler.get('/admin/userlist', {
            withCredentials: true
        });
        return response.data;
    },

    async getNonuserList(): Promise<UserEntity[]> {
        const response = await apiHandler.get('admin/nonuserlist', {
            withCredentials: true
        });
        return response.data;
    },

    async authorizeUser(userId: string, status: 'accept' | 'reject'): Promise<void> {
        await apiHandler.post(`/admin/authorize/${userId}/${status}`, '', {
            withCredentials: true
        });
    },

    async updateUserInfo(userId: string, userEntity: UserEntity): Promise<void> {
        await apiHandler.put(`/admin/update/${userId}`, userEntity, {
            withCredentials: true
        });
    }
};