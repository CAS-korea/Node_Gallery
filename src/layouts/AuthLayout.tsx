import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-rose-50 p-6 opacity-90">
            <div
                className="relative w-full max-w-4xl p-10 rounded-3xl bg-white/40 backdrop-blur-lg  shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden">
                {/* 데코 요소 */}
                <div
                    className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-blue-300 to-indigo-400 rounded-full opacity-10 blur-3xl"/>
                <div
                    className="absolute -bottom-16 -right-16 w-64 h-64 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full opacity-10 blur-3xl"/>
                {/* 콘텐츠 렌더링 영역 */}
                <div className="relative z-10">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
