export type UserRole = 'STUDENT' | 'GRADUATE' | 'PROFESSOR';

export interface PostEntity {
    postId: string;
    userId: string;
    title: string;
    content: string;
    summary: string;
    userTag: string[];
    createAt: Date; // new Date(createAt)
    commentsCount: number;
    likesCount: number;
    scrapsCount: number;
    reportsCount: number;
    postVisibility: "public" | "private" | "followersOnly";
    thumbNailImage: string;
    role: UserRole;
}
