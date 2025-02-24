export type UserRole = 'STUDENT' | 'GRADUATE' | 'PROFESSOR' | 'CAS_CREATOR';

export interface UserInfoDto {
    name: string;
    email: string;
    phoneNumber: string;
    role: UserRole;
    introduce: string;
    profileImageUrl: string;
}