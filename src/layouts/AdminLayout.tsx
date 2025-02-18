import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/HeaderMain';
import Adminsidebar from "../components/AdminSidebar";
import PostContainer from "../components/Container";
import CheerOverlay from "../components/secretfile/CheerOverlay"; // 추가

interface AdminLayoutProps {
    children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <PostContainer>
            <div className="flex flex-col min-h-screen min-w-[1024px] bg-white dark:bg-gray-900 dark:text-gray-200">
                {/* 전체 레이아웃: Sidebar + 메인 컨텐츠 */}
                <div className="flex flex-1">
                    {/* 사이드바 영역 */}
                    <div className="w-64 flex-shrink-0">
                        <Adminsidebar />
                    </div>

                    {/* 메인 컨텐츠 영역: Header + Outlet */}
                    <div className="flex flex-col flex-1 py-8">
                        <Header />
                        <main className="flex-1 bg-white dark:bg-gray-800 p-6 transition-colors">
                            {children || <Outlet />}
                        </main>
                    </div>
                </div>
            </div>
            {/* CheerOverlay 추가 – 나중에 쉽게 제거할 수 있습니다 */}
            <CheerOverlay />
        </PostContainer>
    );
};

export default AdminLayout;
