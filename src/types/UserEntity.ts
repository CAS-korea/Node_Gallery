// types/UserEntity.ts
export type UserRole = 'STUDENT' | 'GRADUATE' | 'PROFESSOR' | 'CAS_CREATOR';

export interface UserEntity {
    userId: string;
    password: string | null;
    name: string;
    phoneNumber: string;
    studentNumber: string;
    email: string;
    role: UserRole;
    isAuthorized: boolean;
    introduce: string;
    profileImageUrl: string;
    bannedUntil: string;
}
