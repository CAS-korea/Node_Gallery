import { createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService.ts";
import { PostService } from "../services/PostService.ts";
import { AdminService } from "../services/AdminService.ts";
import { LoginDTO } from "../types/LoginDTO.ts";
import { UserEntity } from "../types/UserEntity.ts";
import { PostDTO } from "../types/PostDTO.ts";
import { PostEntity } from "../types/PostEntity.ts";
import {FileService} from "../services/FileService.ts";

export interface ServicesContextType {
    login: (loginDTO: LoginDTO) => Promise<void>;
    register: (userEntity: UserEntity) => Promise<void>;
    logout: () => void;
    createPost: (postDTO: PostDTO) => Promise<void>;
    getAllPosts: () => Promise<PostEntity[]>;
    getPostById: (postId: string) => Promise<{post: PostEntity, comments: []}>;
    likePost: (postId: string) => Promise<void>;
    reportPost: (postId: string) => Promise<void>;
    getUserPosts: (userId: string) => Promise<PostEntity[]>;
    authorizeUser: (userId: string, status: "accept" | "reject") => Promise<void>;
    getNonuserList: () => Promise<UserEntity[]>;
    getUserList: () => Promise<UserEntity[]>;
    updateUserInfo: (userId: string, userEntity: UserEntity) => Promise<void>;
    banUser: (userId: string, days: number) => Promise<void>;
    duplicate: (userId: string) => Promise<boolean>;
    findUserId: (email: string) => Promise<void>;
    findPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    uploadImage: (file: File) => Promise<string>;
}

export const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    const value: ServicesContextType = {
        // 🔹 인증 관련 함수 (await 추가)
        login: async (loginDTO) => {
            await AuthService.login(loginDTO);
            navigate("/home");
        },
        register: async (userEntity) => {
            await AuthService.register(userEntity);
            navigate("/login");
        },
        logout: async () => {
            await AuthService.logout();
            navigate("/");
        },
        duplicate: async (userId) => await AuthService.duplicate(userId),
        findUserId: async (email) => await AuthService.findUserId(email),
        findPassword: async (email) => await AuthService.findPassword(email),
        resetPassword: async (token, newPassword) => await AuthService.resetPassword(token, newPassword),

        // 🔹 포스트 관련 함수 (await 추가)
        createPost: async (postDTO) => await PostService.createPost(postDTO),
        getAllPosts: async () => await PostService.getAllPosts(),
        getPostById: async (postId) => await PostService.getPostById(postId),
        likePost: async (postId) => await PostService.likePost(postId),
        reportPost: async (postId) => await PostService.reportPost(postId),
        getUserPosts: async (userId) => await PostService.getUserPosts(userId),

        // 🔹 어드민 관련 함수 (await 추가)
        authorizeUser: async (userId, status) => await AdminService.authorizeUser(userId, status),
        getNonuserList: async () => await AdminService.getNonuserList(),
        getUserList: async () => await AdminService.getUserList(),
        updateUserInfo: async (userId, userEntity) => await AdminService.updateUserInfo(userId, userEntity),
        banUser: async (userId, days) => await AdminService.banUser(userId, days),

        // 🔹 파일 관련 함수 (await 추가)
        uploadImage: async (file) => await FileService.uploadImage(file)
    };

    return <ServicesContext.Provider value={value}>{children}</ServicesContext.Provider>;
};

export const useServices = () => {
    const context = useContext(ServicesContext);
    if (!context) {
        throw new Error("useServices must be used within a ServicesProvider");
    }
    return context;
};