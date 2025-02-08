import React, {ReactNode} from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../components/HeaderMain';
import {useServices} from "../contextAPI/ServicesProvider.tsx";

interface AdminLayoutProps {
    children?: ReactNode;  // children의 타입을 ReactNode로 지정
}

const AdminLayout: React.FC<AdminLayoutProps> = ({children}) => {
    const {logout} = useServices();

    return (
        <div className="flex flex-col min-h-screen min-w-[1024px]">
            {/* 전체 레이아웃: Sidebar + 메인 컨텐츠 */}
            <div className="flex flex-1">
                {/* ✅ Main Content: Header + Outlet (자동으로 남은 공간 차지) */}
                <div className="flex flex-col flex-1 py-8">
                    <Header/>
                    <main className="flex-1 bg-white p-6">
                        {children || <Outlet/>}
                    </main>
                </div>
            </div>
            <button
                onClick={logout}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white w-full transition-all duration-200"
            >로그아웃
            </button>
        </div>
    );
};


export default AdminLayout;
