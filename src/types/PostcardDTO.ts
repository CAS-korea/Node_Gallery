export type UserRole = 'STUDENT' | 'GRADUATE' | 'PROFESSOR';

export interface postInfo {
    postId: string;
    title : string;
    summary: string;
    userTag: string[];
    likesCount: number;
    scrapsCount: number;
    commentsCount: number;
    createAt: Date;
    thumbNailImage: string;
    liked: boolean;
    reported: boolean;
    scraped: boolean;
}

export interface userInfo {
    name: string;
    profileImageUrl: string;
    userId: string;
    role: UserRole;
}