export type UserRole = 'STUDENT' | 'GRADUATE' | 'PROFESSOR' | 'CAS_CREATOR';

export interface cardPostInfo {
    postId: string;
    title : string;
    summary: string;
    userTag: string[];
    likesCount: number;
    scrapsCount: number;
    commentsCount: number;
    createAt: Date;
    thumbNailImage: string;
}

export interface cardUserInfo {
    name: string;
    profileImageUrl: string;
    userId: string;
    role: UserRole;
}

export interface cardActivityInfo {
    liked: boolean;
    reported: boolean;
    scraped: boolean;
}