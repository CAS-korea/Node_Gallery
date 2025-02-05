// types/RegisterDTO.ts
export type UserRole = 'student' | 'graduate' | 'professor';

export interface RegisterDTO {
    id: string;
    password: string;
    name: string;
    phoneNumber: string;
    studentNumber: string;
    email: string;
    role: UserRole;
    isAuthorized: boolean;
    introduce: string;
}
