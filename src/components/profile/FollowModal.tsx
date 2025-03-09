import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FollowUser } from "../../types/FollowUser";
import { Link } from "react-router-dom";
import { ClientUrl } from "../../constants/ClientUrl";
import Cookies from "js-cookie";

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

interface FollowModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    users: FollowUser[];
}

const FollowModal: React.FC<FollowModalProps> = ({ isOpen, onClose, title, users }) => {
    const [currentUserId, setCurrentUserId] = useState<string>("");

    useEffect(() => {
        const cookieInfo = Cookies.get("info");
        if (cookieInfo) {
            try {
                const parsedInfo = JSON.parse(cookieInfo);
                setCurrentUserId(parsedInfo.userId);
            } catch (error) {
                console.error("쿠키 파싱 에러", error);
            }
        }
    }, []);

    if (!isOpen) return null;

    const handleUserClick = () => {
        onClose();
    };

    return (
        <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
                {/* 모달 헤더 */}
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 rounded-full p-2">
                        <X size={20} />
                    </button>
                </div>
                {/* 사용자 목록 또는 비어있을 경우 메시지 */}
                {users.length > 0 ? (
                    <ul className="space-y-4">
                        {users.map((user) => {
                            const profileLink =
                                user.userId === currentUserId
                                    ? ClientUrl.PROFILE
                                    : `${ClientUrl.OTHERSPROFILE}/${user.userId}`;
                            return (
                                <motion.li
                                    key={user.userId}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center space-x-3"
                                >
                                    <Link
                                        to={profileLink}
                                        onClick={handleUserClick}
                                        className="flex items-center space-x-3 w-full hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg transition"
                                    >
                                        <img
                                            src={user.profileImageUrl || "/placeholder.svg"}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <span className="text-gray-800 dark:text-gray-100">{user.name}</span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
                                        </div>
                                    </Link>
                                </motion.li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        해당 유저는 {title}...없네요.
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default FollowModal;
