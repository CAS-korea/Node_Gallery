import {PostDTO} from "../types/PostDTO.ts";
import apiHandler from "../utils/ApiHandler.ts";
import {PostEntity} from "../types/PostEntity.ts";
import {postInfo, userInfo} from "../types/PostcardDTO.ts";

export const PostService = {
    async createPost(postDTO: PostDTO) {
        await apiHandler.post('/post_relation/create', postDTO);
    },

    async getAllPosts(): Promise<{postInfo: postInfo, userInfo: userInfo}> {
        const response = await apiHandler.get('/post_log/allposts');
        return response.data; // { postInfo: ..., userInfo: ... } 형태
    },

    async getUserPosts(userId: string): Promise<PostEntity[]> {
        const response = await apiHandler.get(`/post_log/${userId}`);
        return response.data;
    },

    async getPostById(postId: string): Promise<{post: PostEntity; comments: []}> {
        const response = await apiHandler.get(`/post_log/${postId}`);
        return response.data.data; // { post: ..., comments: [...] } 형태
    },

    async likesPost(postId: string) {
        return await apiHandler.post(`/post_relation/likes/${postId}`, {});
    },

    async scrapsPost(postId: string) {
        return await apiHandler.post(`/post_relation/scraps/${postId}`, {});
    },

    async reportsPost(postId: string) {
        return await apiHandler.post(`/post_relation/report/${postId}`, {});
    }
};