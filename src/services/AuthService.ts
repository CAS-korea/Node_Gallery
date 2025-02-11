import {LoginDTO} from "../types/LoginDTO.ts";
import apiHandler from "../utils/ApiHandler.ts";
import Cookies from "js-cookie";
import {UserEntity} from "../types/UserEntity.ts";

export const AuthService = {
    async login(loginDTO: LoginDTO) {
        const response = await apiHandler.post('/user_log/login', loginDTO, {
            withCredentials: true
        });

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

    logout() {
        Cookies.remove('info');
        Cookies.remove('token');
    }
};