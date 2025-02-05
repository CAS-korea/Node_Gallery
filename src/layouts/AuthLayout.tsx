// AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <div className="backdrop-blur-md shadow-none flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-10">
            <div
                className="w-full min-w-[900px] max-w-[1200px] h-[80vh] max-h-[700px] rounded-[40px] overflow-hidden flex bg-gradient-to-r from-[#000000] to-[#ffffff] shadow-2xl relative">
                {/* 배경 원형 노드들 */}
                <div className="absolute inset-0">
                    {/* 왼쪽 그룹 */}
                    <div className="absolute w-40 h-40 bg-white/50 rounded-full left-20 bottom-32"/>
                    <div className="absolute w-24 h-24 bg-white/50 rounded-full left-40 top-20"/>
                    <div className="absolute w-16 h-16 bg-white/50 rounded-full left-80 bottom-40"/>

                    {/* 오른쪽 그룹 */}
                    <div className="absolute w-36 h-36 bg-white/50 rounded-full right-20 top-20"/>
                    <div className="absolute w-20 h-20 bg-white/50 rounded-full right-48 top-40"/>
                    <div className="absolute w-28 h-28 bg-white/50 rounded-full right-32 bottom-24"/>
                </div>
                {/* Outlet을 위한 레이어 */}
                <div className="relative z-10 flex w-full">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
