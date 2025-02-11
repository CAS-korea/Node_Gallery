import {createContext, ReactNode, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthService} from "../services/AuthService.ts";
import {PostService} from "../services/PostService.ts";
import {AdminService} from "../services/AdminService.ts";
import {LoginDTO} from "../types/LoginDTO.ts";
import {UserEntity} from "../types/UserEntity.ts";
import {PostDTO} from "../types/PostDTO.ts";
import {PostEntity} from "../types/PostEntity.ts";

export interface ServicesContextType {
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

export const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const navigate = useNavigate();

    const value: ServicesContextType = {

        // 인증 관련 함수
        login: async (loginDTO) => {
            await AuthService.login(loginDTO);
            navigate('/home');
        },
        register: async (userEntity) => {
            await AuthService.register(userEntity);
            navigate('/login');
        },
        logout: () => {
            AuthService.logout();
            navigate('/');
        },

        // 포스트 관련 함수
        createPost: (postDTO) => PostService.createPost(postDTO),
        getAllPosts: () => PostService.getAllPosts(),
        getPostById: (postID) => PostService.getPostById(postID),
        likePost: (postID) => PostService.likePost(postID),
        reportPost: (postID) => PostService.reportPost(postID),
        getUserPosts: (userId) => PostService.getUserPosts(userId),

        // 어드민 관련 함수
        authorizeUser: (userId, status) => AdminService.authorizeUser(userId, status),
        getNonuserList: () => AdminService.getNonuserList(),
        getUserList: () => AdminService.getUserList(),
        updateUserInfo: (userId, userEntity) => AdminService.updateUserInfo(userId, userEntity)
    };

    return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
};


export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error('useServices must be used within a ServicesProvider');
    }
    return context;
}