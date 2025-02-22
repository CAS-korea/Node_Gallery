import apiHandler from "../utils/ApiHandler.ts";
import {NewCommentDto} from "../types/NewCommentDto.ts";

export const CommentService = {
    async createComment(postId: string, newCommentDto: NewCommentDto) {
        await apiHandler.post(`/post_relation/comment/${postId}`, newCommentDto);
    },

    async likeComment(commentId: string) {
        await apiHandler.post(`/post_relation/comment/likes/${commentId}`);
    },

    async reportComment(commentId: string) {
        await apiHandler.post(`/post_relation/comment/reports/${commentId}`);
    }
}