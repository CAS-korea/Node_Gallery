// src/layouts/BasicLayout.tsx

import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import AdminSidebar from '../components/AdminSidebar';
import Sidebar from '../components/Sidebar';
import Header from '../components/HeaderMain';

interface BasicLayoutProps {
    children?: ReactNode;
}

// 쿠키에 저장된 userInfo의 타입 예시
interface UserInfo {
    name: string;
    email: string;
    phoneNumber: string;
    role: string; // "CAS_CREATOR" (관리자), "USER" (일반 유저) 등
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
    // 1) 쿠키에서 userInfo 가져오기
    const token = Cookies.get('info');
    const userInfo: UserInfo | null = token ? JSON.parse(token) : null;

    // 2) 관리자 여부 판단
    const isAdmin = userInfo?.role === 'CAS_CREATOR';

    return (
        <div className="flex flex-col min-h-screen min-w-[1024px] bg-white dark:bg-gray-900 dark:text-gray-200">
            <div className="flex flex-1">
                {/* 사이드바 영역 */}
                <div className="w-64 flex-shrink-0">
                    {isAdmin ? <AdminSidebar/> : <Sidebar/>}
                </div>

                {/* 메인 컨텐츠 영역: Header + Outlet */}
                <div className="flex flex-col flex-1 pt-14 rounded-3xl">
                    <Header/>
                    <main className="flex-1 bg-white dark:bg-gray-800 p-6 flex justify-center">
                        {/* children 있으면 children 렌더, 없으면 Outlet 사용 */}
                        {children || <Outlet/>}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default BasicLayout;
