// types/RegisterDTO.ts
export type UserRole = 'STUDENT' | 'GRADUATE';

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
    role: UserRole;
}
