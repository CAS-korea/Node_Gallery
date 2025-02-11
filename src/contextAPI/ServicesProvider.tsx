import {createContext, ReactNode, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import apiHandler from "./ApiHandler.tsx";
import {LoginDTO} from "../types/LoginDTO";
import {UserEntity} from "../types/UserEntity.tsx";
import {PostDTO} from "../types/PostDTO";
import {PostEntity} from "../types/PostEntity"; // 추가
import Cookies from 'js-cookie';
import {ClientUrl} from "../constants/ClientUrl.tsx";

interface ServicesContextType {
    login: (loginDTO: LoginDTO) => Promise<void>;
    register: (userEntity: UserEntity) => Promise<void>;
    logout: () => void;
    createPost: (postDTO: PostDTO) => Promise<void>;
    getAllPosts: () => Promise<PostEntity[]>;
    getPostById: (postID: string) => Promise<PostEntity>;
    likePost: (postID: string) => Promise<void>;
    reportPost: (postID: string) => Promise<void>;
    getUserPosts: (userId: string) => Promise<PostEntity[]>;
    authorizeUser: (userId: string, status: 'accept' | 'reject') => Promise<void>;
    getNonuserList: () => Promise<UserEntity[]>;
    getUserList: () => Promise<UserEntity[]>;
    updateUserInfo: (userId: string, userEntity: UserEntity) => Promise<void>;
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

    const register = async (userEntity: UserEntity) => {
        try {
            await apiHandler.post('/user_log/register', userEntity);
            navigate(ClientUrl.LOGIN);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    };

    const login = async (loginDTO: LoginDTO) => {
        try {
            const response = await apiHandler.post('/user_log/login', loginDTO, {
                    withCredentials: true,  // 쿠키 전송을 허용
            });

            // 쿠키에 토큰 저장 (유효 기간 1일)
            Cookies.set('info', JSON.stringify(response.data.userInfo), {
                expires: 1,
                secure: false,
                sameSite: 'Lax',
                //secure true에 'strict'여야함. 지금 임시로 뚫은거.
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
        Cookies.remove('info');
        Cookies.remove('token');
        navigate(ClientUrl.INDEX)
    };

    const createPost = async (postDTO: PostDTO) => {
        try {
            await apiHandler.post('/post_relation/create', postDTO, {
                withCredentials: true,  // 쿠키 전송을 허용
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
            await apiHandler.post(`/post_relation/likes/${postID}`, {}, {
                withCredentials: true,  // 쿠키 전송을 허용
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
            await apiHandler.post(`/post_relation/report/${postID}`, {}, {
                withCredentials: true,  // 쿠키 전송을 허용
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

    const authorizeUser = async (userId: string, status: 'accept' | 'reject') => {
        try {
            await apiHandler.post(`/admin/authorize/${userId}/${status}`, '', {
                withCredentials: true,  // 쿠키 전송을 허용
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    const getNonuserList = async () => {
        try {
            const response = await apiHandler.get(`/admin/nonuserlist`, {
                withCredentials: true,  // 쿠키 전송을 명시적으로 허용
            });
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }


    const getUserList = async () => {
        try {
            const response = await apiHandler.get(`/admin/userlist`, {
                withCredentials: true,  // 쿠키 전송을 명시적으로 허용
            });

            console.log("User list response:", response);  // 디버깅용 로그 추가
            return response.data;
        } catch (error: unknown) {
            if (error instanceof Error) {

                console.error("Error fetching user list:", error);  // 에러 로그 추가
                throw new Error(error.message);
            }
        }
    }

    const updateUserInfo = async (userId: string, userEntity: UserEntity) => {
        try {
            await apiHandler.put(`/admin/update/${userId}`, userEntity, {
                withCredentials: true,  // 쿠키 전송을 허용
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
    }

    const value = {
        login,
        register,
        logout,
        createPost,
        getAllPosts,
        getPostById,
        likePost,
        reportPost,
        getUserPosts,
        authorizeUser,
        getNonuserList,
        getUserList,
        updateUserInfo
    };

    return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
};
