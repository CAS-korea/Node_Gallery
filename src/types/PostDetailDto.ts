export type postVisibility = 'PUBLIC' | 'PRIVATE' | 'FOLLOWERS_ONLY';
export type UserRole = 'STUDENT' | 'GRADUATE' | 'PROFESSOR' | 'CAS_CREATOR';

export interface postInfo {
    title: string;
    content: string;
    commentsCount: number;
    createAt: Date;
    likesCount: number;
    scrapsCount: number;
    reportsCount: number;
    postVisibility: postVisibility;
    thumbNailImage: string;
}

export interface postActivity {
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

