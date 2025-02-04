import React, {ReactNode} from 'react';
import {Outlet} from 'react-router-dom';
import Sidebar from '../components/Sidebar';

interface BasicLayoutProps {
    children?: ReactNode;  // children의 타입을 ReactNode로 지정
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen min-w-[1024px]">
            <div className="flex flex-1">
                <Sidebar/>
                <main className="flex-1 bg-gray-50 p-6">
                    {children || <Outlet />}
                </main>
            </div>
        </div>
    );
};

export default BasicLayout;
