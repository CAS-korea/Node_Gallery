import type React from "react";
import {Link, useLocation} from "react-router-dom";
import {ClientUrl} from "../constants/ClientUrl.ts";
import {motion} from "framer-motion";
import {useServices} from "../context/ServicesProvider";
import {Home, Search, PlusCircle, MessageCircle, User, Bell, Settings, LogOut, Monitor} from "lucide-react";

const Adminsidebar: React.FC = () => {
    const {logout} = useServices();
    const location = useLocation();

    // 관리자 전용 메뉴 (텍스트 일부 변경)
    const navItems = [
        {path: ClientUrl.HOME, label: "홈", icon: <Home size={22}/>},
        {path: ClientUrl.SEARCH, label: "검색", icon: <Search size={22}/>},
        { path: ClientUrl.NEWPOST, label: "게시물 작성", icon: <PlusCircle size={22} /> },
        { path: ClientUrl.MESSAGE, label: "메시지", icon: <MessageCircle size={22} /> },
        {path: ClientUrl.PROFILE, label: "프로필", icon: <User size={22}/>},
        {path: ClientUrl.NOTIFICATION, label: "알림", icon: <Bell size={22}/>},
        {path: ClientUrl.SETTINGS, label: "설정", icon: <Settings size={22}/>},
        { path: ClientUrl.ADMIN, label: "관리", icon: <Monitor size={22} /> },
    ];

    return (
        <motion.aside
            initial={{x: -20, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 0.3, ease: "easeOut"}}
            // 헤더 높이가 대략 4rem(=16px * 4)라고 가정: top-16로 헤더와 겹치지 않게 처리
            className="fixed top-[55px] w-64 h-[calc(100vh-3rem)] bg-gradient-to-b from-white dark:from-gray-800 to-gray-50 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg p-6 py-6 flex flex-col justify-between z-50"
        >
            <div>
                {/* 사이드바 상단 부분 */}
                <motion.div
                    initial={{y: -10, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.1, duration: 0.2}}
                    className="mb-10"
                >
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        관리자님 어서오세요!
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        - Admin Console -
                    </p>
                </motion.div>

                {/* 네비게이션 메뉴 */}
                <nav className="flex flex-col gap-y-2">
                    {navItems.map(({ path, label, icon }) => {
                        const isSelected = location.pathname === path;

                        return (
                            <Link key={path} to={path}>
                                <motion.div
                                    whileHover={{ x: 4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`
                    relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-400 ease-in-out 
                    ${
                                        isSelected
                                            ? // 선택된 메뉴는 그라디언트와 색상 강조
                                            "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md transform translate-x-1"
                                            : // 기본 상태
                                            "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }
                  `}
                                >
                                    <span className="relative z-10">{icon}</span>
                                    <span className="relative z-10 text-[16px]">
                    {label}
                  </span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* 로그아웃 버튼 */}
            <motion.button
                onClick={logout}
                whileHover={{y: -2, boxShadow: "0 4px 6px rgba(0,0,0,0.1)"}}
                whileTap={{y: 0, boxShadow: "0 2px 4px rgba(0,0,0,0.1)"}}
                transition={{duration: 0.2}}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white w-full transition-all duration-200 shadow-md"
            >
                <LogOut size={22}/>
                <span className="text-[16px] font-medium">로그아웃</span>
            </motion.button>
        </motion.aside>
    );
};

export default Adminsidebar;
