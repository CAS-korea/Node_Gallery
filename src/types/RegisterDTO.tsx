// types/RegisterDTO.ts
export type UserRole = 'STUDENT' | 'GRADUATE' | 'PROFESSOR';

export interface RegisterDTO {
    userId: string;
    password: string;
    name: string;
    phoneNumber: string;
    studentNumber: string;
    email: string;
    role: UserRole;
    isAuthorized: boolean;
    introduce: string;
    profileImageUrl: string;
}
