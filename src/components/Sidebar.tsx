import React from 'react';
import { Link } from 'react-router-dom';
import {ClientUrl} from "../constants/ClientUrl.tsx";
import { motion } from "framer-motion";
import { useServices } from '../contextAPI/ServicesProvider';
import { Home, Search, PlusCircle, MessageCircle, User, Bell, Settings, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
    // ✅ 전역 상태 (로그인 함수만 사용)
    const {logout} = useServices();

    const navItems = [
        { path: ClientUrl.HOME, label: "홈", icon: <Home size={22} /> },
        { path: ClientUrl.SEARCH, label: "검색", icon: <Search size={22} /> },
        { path: ClientUrl.NEWPOST, label: "새 게시물", icon: <PlusCircle size={22} /> },
        { path: ClientUrl.MESSAGELOG, label: "채팅", icon: <MessageCircle size={22} /> },
        { path: ClientUrl.PROFILE, label: "프로필", icon: <User size={22} /> },
        { path: ClientUrl.NOTIFICATION, label: "알림", icon: <Bell size={22} /> },
        { path: ClientUrl.SETTINGS, label: "설정", icon: <Settings size={22} /> }
    ];

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-64 h-screen bg-white/70 backdrop-blur-md border-r border-gray-200 shadow-lg p-6 flex flex-col justify-between"
        >
            <nav className="flex flex-col gap-y-5 py-14">
                {navItems.map(({ path, label, icon }) => (
                    <Link key={path} to={path}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}  //
                            whileTap={{ scale: 1.05, zIndex: 10 }}  // 🚀 클릭 시 Z축 이동
                            className={`relative flex items-center gap-3 px-4 py-4 rounded-lg text-black transition-all duration-2 ease-in-out
                            ${
                                location.pathname === path
                                    ? "bg-gray-100 text-black shadow-lg scale-120 drop-shadow-lg"  // ✅ 현재 선택된 메뉴 강조
                                    : "bg-white"  // ✅ 호버 시 Drop Shadow 추가
                            }`}
                        >
                            {icon}
                            <span className="text-[16px] font-medium">{label}</span>
                        </motion.div>
                    </Link>
                ))}
            </nav>

            <motion.button
                onClick={logout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white w-full transition-all duration-200"
            >
                <LogOut size={22} />
                <span className="text-[16px] font-medium">로그아웃</span>
            </motion.button>
        </motion.aside>
    );
};

export default Sidebar;
