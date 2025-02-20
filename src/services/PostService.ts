import {PostDTO} from "../types/PostDTO.ts";
import apiHandler from "../utils/ApiHandler.ts";
import {PostEntity} from "../types/PostEntity.ts";

export const PostService = {
    async createPost(postDTO: PostDTO) {
        await apiHandler.post('/post_relation/create', postDTO);
    },

    async getAllPosts(): Promise< PostEntity[]> {
        const response = await apiHandler.get('/post_log/allposts');
        return response.data;
    },

    async getUserPosts(userId: string): Promise<PostEntity[]> {
        const response = await apiHandler.get(`/post_log/${userId}`);
        return response.data;
    },

    async getPostById(postId: string): Promise<{post: PostEntity; comments: []}> {
        const response = await apiHandler.get(`/post_log/${postId}`);
        return response.data.data; // { post: ..., comments: [...] } 형태
    },

    async likePost(postId: string) {
        await apiHandler.post(`/post_relation/likes/${postId}`, {});
    },

    async reportPost(postId: string) {
        await apiHandler.post(`/post_relation/report/${postId}`, {});
    }
};
