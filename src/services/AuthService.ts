import {LoginDto} from "../types/LoginDto.ts";
import apiHandler from "../utils/ApiHandler.ts";
import Cookies from "js-cookie";
import {UserEntity} from "../types/UserEntity.ts";

export const AuthService = {
    async login(loginDTO: LoginDto) {
        const response = await apiHandler.post('/user_log/login', loginDTO);

        Cookies.set('info', JSON.stringify(response.data.userInfo), {
            expires: 1,
            secure: false,
            sameSite: 'Lax',
        });

        return response.data.userInfo;
    },

    async register(registerDTO: UserEntity) {
        await apiHandler.post('/user_log/register', registerDTO)
    },

    async duplicate(userId: string) {
        const response = await apiHandler.get(`/user_log/duplicate/${userId}`);

        return response.data;
    },

    async findUserId(email: string) {
        await apiHandler.post(`/user_log/findid/${email}`);
    },

    async findPassword(email: string) {
        await apiHandler.post(`/user_log/resetpassword/${email}`);
    },

    async resetPassword(token: string, newPassword: string) {
        await apiHandler.put('/user_log/savenewpassword', {
            token,
            newPassword
        });
    },

    logout() {
        Cookies.remove('info');
        Cookies.remove('token');
    }
};