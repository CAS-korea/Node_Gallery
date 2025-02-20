import React, { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/HeaderMain";
import AdminSidebar from "../components/AdminSidebar";
import PostContainer from "../components/Container";
import CheerOverlay from "../components/secretfile/CheerOverlay"; // 추가

interface AdminLayoutProps {
    children?: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const location = useLocation();

    return (
        <PostContainer>
            <div className="flex flex-col min-h-screen min-w-[1024px] bg-white dark:bg-gray-900 dark:text-gray-200">
                <div className="flex flex-1">
                    {/* 사이드바 영역: 항상 렌더링되어 상태 유지 */}
                    <div className="w-64 flex-shrink-0">
                        <AdminSidebar />
                    </div>

                    {/* 메인 컨텐츠 영역: Header + Outlet */}
                    <div className="flex flex-col flex-1 py-8">
                        <Header />
                        <main className="flex-1 bg-white dark:bg-gray-800 p-6 transition-colors">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={location.pathname}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {children || <Outlet />}
                                </motion.div>
                            </AnimatePresence>
                        </main>
                    </div>
                </div>
            </div>
            <CheerOverlay />
        </PostContainer>
    );
};

export default AdminLayout;
