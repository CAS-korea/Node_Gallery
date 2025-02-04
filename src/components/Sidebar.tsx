import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useServices } from '../contextAPI/ServicesProvider';

const Sidebar: React.FC = () => {
    const { setAuthState } = useServices();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({ isAuthenticated: false, username: null });
        navigate('/');
    };

    return (
        <aside className="w-64 bg-gray-800 text-white border-r border-gray-700 p-6 sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-between">
            <nav className="space-y-6">
                <Link to="/search" className="flex items-center space-x-2 hover:text-gray-300">
                    <span>검색</span>
                </Link>
                <Link to="/new-post" className="flex items-center space-x-2 hover:text-gray-300">
                    <span>새 게시물</span>
                </Link>
                <Link to="/dm-list" className="flex items-center space-x-2 hover:text-gray-300">
                    <span>채팅 목록</span>
                </Link>
                <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-300">
                    <span>프로필</span>
                </Link>
                <Link to="/alarm" className="flex items-center space-x-2 hover:text-gray-300">
                    <span>알림</span>
                </Link>
                <Link to="/settings" className="flex items-center space-x-2 hover:text-gray-300">
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
