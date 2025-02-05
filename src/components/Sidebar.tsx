import React from 'react';
import { Link } from 'react-router-dom';
import {useServices} from "../contextAPI/ServicesProvider.tsx";
import {ROUTES} from "../constants/routes.tsx";

const Sidebar: React.FC = () => {
    // ✅ 전역 상태 (로그인 함수만 사용)
    const {logout} = useServices();

    return (
        <aside className="w-64 bg-gray-800 text-white border-r border-gray-700 p-6 sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-between">
            <nav className="space-y-6">
                <Link to={ROUTES.HOME} className="flex items-center space-x-2 hover:text-gray-300">
                    <span>홈</span>
                </Link>
                <Link to={ROUTES.SEARCH} className="flex items-center space-x-2 hover:text-gray-300">
                    <span>검색</span>
                </Link>
                <Link to={ROUTES.NEWPOST} className="flex items-center space-x-2 hover:text-gray-300">
                    <span>새 게시물</span>
                </Link>
                <Link to={ROUTES.MESSAGE} className="flex items-center space-x-2 hover:text-gray-300">
                    <span>채팅 목록</span>
                </Link>
                <Link to={ROUTES.PROFILE} className="flex items-center space-x-2 hover:text-gray-300">
                    <span>프로필</span>
                </Link>
                <Link to={ROUTES.NOTIFICATION} className="flex items-center space-x-2 hover:text-gray-300">
                    <span>알림</span>
                </Link>
                <Link to={ROUTES.SETTINGS} className="flex items-center space-x-2 hover:text-gray-300">
                    <span>설정</span>
                </Link>
            </nav>

            {/* 로그아웃 버튼 */}
            <button
                onClick={logout}
                className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md w-full"
            >
                로그아웃
            </button>
        </aside>
    );
};

export default Sidebar;
