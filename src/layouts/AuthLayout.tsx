import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-rose-50 p-6">
            <div className="relative w-full max-w-4xl p-10 rounded-3xl bg-white/40 backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden">
                {/* 콘텐츠 렌더링 영역 */}
                <div className="relative z-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
