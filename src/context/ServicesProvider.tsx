import { createContext, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService.ts";
import { PostService } from "../services/PostService.ts";
import { AdminService } from "../services/AdminService.ts";
import { LoginDto } from "../types/LoginDto.ts";
import { UserEntity } from "../types/UserEntity.ts";
import { NewPostDto } from "../types/NewPostDto.ts";
import { PostEntity } from "../types/PostEntity.ts";
import {FileService} from "../services/FileService.ts";
import {cardActivityInfo, cardPostInfo, cardUserInfo} from "../types/PostcardDto.ts";
import {postActivity, postInfo, userInfo} from "../types/PostDetailDto.ts";
import {CommentDetailDto} from "../types/CommentDetailDto.ts";
import {NewCommentDto} from "../types/NewCommentDto.ts";
import {CommentService} from "../services/CommentService.ts";

export interface ServicesContextType {
    login: (loginDTO: LoginDto) => Promise<void>;
    register: (userEntity: UserEntity) => Promise<void>;
    logout: () => void;
    createPost: (newPostDto: NewPostDto) => Promise<void>;
    getAllPosts: () => Promise<{postInfo: cardPostInfo, userInfo: cardUserInfo, postActivity: cardActivityInfo}>;
    getPostById: (postId: string) => Promise<{
        post: postInfo,
        postActivity: postActivity,
        author: userInfo,
        comment: CommentDetailDto[]
    }>;
    likePost: (postId: string) => Promise<void>;
    scrapPost: (postId: string) => Promise<void>;
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
    createComment: (postId: string, newCommentDto: NewCommentDto) => Promise<void>;
    likeComment: (commentId: string) => Promise<void>;
    reportComment: (commentId: string) => Promise<void>;
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
            AuthService.logout();
            navigate("/");
        },
        duplicate: async (userId) => await AuthService.duplicate(userId),
        findUserId: async (email) => await AuthService.findUserId(email),
        findPassword: async (email) => await AuthService.findPassword(email),
        resetPassword: async (token, newPassword) => await AuthService.resetPassword(token, newPassword),

        // 🔹 포스트 관련 함수 (await 추가)
        createPost: async (newPostDto) => await PostService.createPost(newPostDto),
        getAllPosts: async () => await PostService.getAllPosts(),
        getPostById: async (postId) => await PostService.getPostById(postId),
        likePost: async (postId) => await PostService.likePost(postId),
        scrapPost: async (postId) => await PostService.scrapPost(postId),
        reportPost: async (postId) => await PostService.reportPost(postId),
        getUserPosts: async (userId) => await PostService.getUserPosts(userId),

        // 🔹 어드민 관련 함수 (await 추가)
        authorizeUser: async (userId, status) => await AdminService.authorizeUser(userId, status),
        getNonuserList: async () => await AdminService.getNonuserList(),
        getUserList: async () => await AdminService.getUserList(),
        updateUserInfo: async (userId, userEntity) => await AdminService.updateUserInfo(userId, userEntity),
        banUser: async (userId, days) => await AdminService.banUser(userId, days),

        // 🔹 댓글 관련 함수 (await 추가)
        createComment: async (postId, newCommentDto) => await CommentService.createComment(postId, newCommentDto),
        likeComment: async (commentId) => await CommentService.likeComment(commentId),
        reportComment: async (commentId) => await CommentService.reportComment(commentId),

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
