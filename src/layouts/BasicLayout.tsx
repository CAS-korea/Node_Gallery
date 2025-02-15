import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/HeaderMain';

interface BasicLayoutProps {
    children?: ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen min-w-[1024px] bg-white dark:bg-gray-900 dark:text-gray-200">
            {/* 전체 레이아웃: Sidebar + 메인 컨텐츠 */}
            <div className="flex flex-1">
                {/* Sidebar (고정 크기) */}
                <div className="w-64 flex-shrink-0">
                    <Sidebar />
                </div>

                {/* Main Content: Header + Outlet */}
                <div className="flex flex-col flex-1 py-8">
                    <Header />
                    <main className="flex-1 bg-white dark:bg-gray-800 p-6">
                        {children || <Outlet />}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default BasicLayout;
