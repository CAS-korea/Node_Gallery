import {PostDTO} from "../types/PostDTO.ts";
import apiHandler from "../utils/ApiHandler.ts";
import {PostEntity} from "../types/PostEntity.ts";

export const PostService = {
    async createPost(postDTO: PostDTO) {
        await apiHandler.post('/post_relation/create', postDTO, {
            withCredentials: true
        });
    },

    async getAllPosts(): Promise<PostEntity[]> {
        const response = await apiHandler.get('/post_log/');
        return response.data;
    },

    async getUserPosts(userId: string): Promise<PostEntity[]> {
        const response = await apiHandler.get(`/post_log/${userId}`);
        return response.data;
    },

    async getPostById(postID: string): Promise<PostEntity> {
        const response = await apiHandler.get(`/post_log/specific/${postID}`);
        return response.data;
    },

    async likePost(postID: string) {
        await apiHandler.post(`/post_relation/likes/${postID}`, {}, {
            withCredentials: true
        });
    },

    async reportPost(postID: string) {
        await apiHandler.post(`/post_relation/report/${postID}`, {}, {
            withCredentials: true
        });
    }
};