export interface Comment {
    commentId: string;
    postId: string; // 댓글이 속한 게시물 ID
    userId: string;
    content: string;
    createAt: Date;
    liked: boolean;
    likesCount: number;
    userName: string;
    userRole: string;
}
