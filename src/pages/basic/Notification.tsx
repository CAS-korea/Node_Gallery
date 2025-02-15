import React from 'react';
import PostContainer from "../../components/Container";
import { FileText, MessageSquare, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface NotificationItem {
    id: number;
    user: string;
    type: 'post' | 'comment' | 'message';
    text: string;
    time: string;
}

const notifications: NotificationItem[] = [
    { id: 1, user: "박정x", type: "post", text: "게시물을 올렸습니다.", time: "2시간 전" },
    { id: 2, user: "박정x", type: "comment", text: "댓글을 달았습니다.", time: "3시간 전" },
    { id: 3, user: "전용x", type: "message", text: "메시지를 보냈습니다.", time: "5시간 전" },
];

const Notification: React.FC = () => {
    return (
        <PostContainer>
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
                    알림
                </h1>
                <motion.ul
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {notifications.map((item, index) => (
                        <motion.li
                            key={item.id}
                            className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-md flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* 아이콘 영역 */}
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                                {item.type === "post" && <FileText className="w-6 h-6 text-blue-500" />}
                                {item.type === "comment" && <MessageSquare className="w-6 h-6 text-green-500" />}
                                {item.type === "message" && <Mail className="w-6 h-6 text-purple-500" />}
                            </div>
                            {/* 텍스트 영역 */}
                            <div className="flex-1">
                                <p className="text-gray-800 dark:text-gray-100">
                                    <span className="font-semibold">{item.user}</span>님이 {item.text}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.time}</p>
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </PostContainer>
    );
};

export default Notification;
