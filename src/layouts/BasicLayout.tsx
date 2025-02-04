import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const BasicLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen min-w-[1024px]">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 bg-gray-50 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default BasicLayout;
