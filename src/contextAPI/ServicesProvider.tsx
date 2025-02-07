import {createContext, ReactNode, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import apiHandler from "./ApiHandler.tsx";
import {LoginDTO} from "../types/LoginDTO";
import {RegisterDTO} from "../types/RegisterDTO";
import {PostDTO} from "../types/PostDTO";
import {PostEntity} from "../types/PostEntity"; // 추가
import Cookies from 'js-cookie';
import {ClientUrl} from "../constants/ClientUrl.tsx";

interface ServicesContextType {
    login: (loginDTO: LoginDTO) => Promise<void>;
    register: (registerDTO: RegisterDTO) => Promise<void>;
    logout: () => void;
    createPost: (postDTO: PostDTO) => Promise<void>;
    getAllPosts: () => Promise<PostEntity[]>; // 추가
    getPostById: (postID: string) => Promise<PostEntity>; // 추가
    likePost: (postID: string) => Promise<void>; // 추가
    reportPost: (postID: string) => Promise<void>; // 추가
    getUserPosts: (username: string) => Promise<PostEntity[]>; // 추가
}

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
};

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const navigate = useNavigate();

    const register = async (registerDTO: RegisterDTO) => {
        try {
            await apiHandler.post('/user_log/register', registerDTO);
            navigate(ClientUrl.LOGIN);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    const login = async (loginDTO: LoginDTO) => {
        try {
            const response = await apiHandler.post('/user_log/login', loginDTO);

            // 쿠키에 토큰 저장 (유효 기간 1일)
            Cookies.set('token', JSON.stringify(response.data.userInfo), {
                expires: 1,
                secure: true,
                sameSite: 'Strict'
            });

            navigate(ClientUrl.HOME);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    const logout = () => {
        // 쿠키 토큰 삭제
        Cookies.remove('token');

        navigate(ClientUrl.HOME)
    };

    const createPost = async (postDTO: PostDTO) => {
        try {
            const token = localStorage.getItem('token');
            await apiHandler.post('/post_relation/create', postDTO, {
                headers: {Authorization: `Bearer ${token}`},
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    // 모든 게시물 가져오기
    const getAllPosts = async (): Promise<PostEntity[]> => {
        try {
            const response = await apiHandler.get('/post_log/');
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            return [];
        }
    };

    // 특정 ID의 게시물 가져오기
    const getPostById = async (postID: string): Promise<PostEntity> => {
        try {
            const response = await apiHandler.get(`/post_log/specific/${postID}`);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('게시물 불러오기 실패');
        }
    };

    // 게시물 좋아요 기능
    const likePost = async (postID: string) => {
        try {
            const token = localStorage.getItem('token');
            await apiHandler.post(`/post_relation/likes/${postID}`, {}, {
                headers: {Authorization: `Bearer ${token}`},
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    // 게시물 신고 기능
    const reportPost = async (postID: string) => {
        try {
            const token = localStorage.getItem('token');
            await apiHandler.post(`/post_relation/report/${postID}`, {}, {
                headers: {Authorization: `Bearer ${token}`},
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    // 특정 사용자의 게시물 가져오기
    const getUserPosts = async (username: string): Promise<PostEntity[]> => {
        try {
            const response = await apiHandler.get(`/post_log/${username}`);
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            return [];
        }
    };

    const value = {
        login,
        register,
        logout,
        createPost,
        getAllPosts,   // 추가
        getPostById,   // 추가
        likePost,      // 추가
        reportPost,    // 추가
        getUserPosts,  // 추가
    };

    return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
};
